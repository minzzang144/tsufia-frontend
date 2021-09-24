import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Prompt, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toast';
import * as yup from 'yup';

import * as I from '.';

import socket from '@/socket';
import { ChatAPI, GameAPI, RoomAPI } from '@api';
import { User } from '@auth';
import useInterval from '@hooks/useInterval';
import { RootState } from '@modules';
import {
  enterRoom,
  getRoom,
  leaveRoom,
  removeRoom,
  Room,
  updateRoom,
  updateRoomError,
  updateRoomGame,
  updateRoomLoading,
} from '@room';
import { resetRooms } from '@rooms';
import { RoomPagePresenter } from '@pages/RoomPage/RoomPagePresenter';
import {
  Chat,
  createChats,
  getChats,
  resetChats,
  updateChatsError,
  updateChatsLoading,
} from '@chats';
import { Cycle, Game } from '@game';

// Update Room Validate Schema
const updateRoomSchema = yup.object().shape({
  title: yup.string().required(),
  totalHeadCount: yup.string().required(),
});

// Update Room Validate Schema
const chatFormSchema = yup.object().shape({
  content: yup.string().min(1),
});

// Update Form Context 생성
const UpdateRoomFormContext = createContext<I.IUpdateRoomFormContext | undefined>(undefined);
// Room Page Context 생성
const RoomPageContext = createContext<I.IRoomPageContext | undefined>(undefined);
// Chat Form Context 생성
const ChatFormContext = createContext<I.IChatFormContext | undefined>(undefined);

export const useUpdateRoomFormContext = () => {
  const context = useContext(UpdateRoomFormContext);
  if (!context) throw new Error('Update Room Form Context가 존재하지 않습니다');
  return context;
};

export const useRoomPageContext = () => {
  const context = useContext(RoomPageContext);
  if (!context) throw new Error('Room Page Context가 존재하지 않습니다');
  return context;
};

export const useChatFormContext = () => {
  const context = useContext(ChatFormContext);
  if (!context) throw new Error('Chat Form Context가 존재하지 않습니다');
  return context;
};

export const RoomPageContainer: React.FC = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [selfUserInRoom, setSelfUserInRoom] = useState<User | undefined>();
  const [enterUser, setEnterUser] = useState<User | undefined>();
  const [leaveUser, setleaveUser] = useState<User | undefined>(undefined);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [delay, _setDelay] = useState<number>(1000);
  const [countDown, setCountDown] = useState<number>(-2);
  const [reciveCountDown, setRecieveCountDown] = useState<number>();
  const [increment, setIncrement] = useState<number>(-1);
  const [selectCitizenId, setSelectCitizenId] = useState<number | undefined>(undefined);
  const [selectUserId, setSelectUserId] = useState<number | undefined>(undefined);
  const [votedUserList, setVotedUserList] = useState<number[]>([]);
  const [isInit, setIsInit] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm<I.UpdateRoomFormInput>({ mode: 'all', resolver: yupResolver(updateRoomSchema) });
  const {
    register: chatRegister,
    handleSubmit: chatHandleSubmit,
    control: chatControl,
    getValues: chatGetValues,
    formState: { errors: chatErrors, isValid: chatIsValid },
    reset: chatReset,
  } = useForm<I.ChatFormInput>({ mode: 'all', resolver: yupResolver(chatFormSchema) });
  const { user, room } = useSelector(
    (state: RootState) => ({
      user: state.authentication.user,
      loading: state.room.loading,
      error: state.room.error,
      room: state.room.data,
    }),
    shallowEqual,
  );
  const currentUser = room && user && room.userList.find((listUser) => listUser.id === user.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  // [Private] 방에 입장한 후 유저의 정보를 가져오는 함수
  const getSelfUserInRoom = useCallback(() => {
    if (room && user) {
      const self = room.userList.find((listUser) => listUser.id === user.id);
      if (self) setSelfUserInRoom(() => self);
    }
  }, [room?.userList, user]);

  // [Private] 사용자가 방에 처음 입장했을 때 방의 정보를 가져오는 API 함수
  async function getRoomProcess() {
    try {
      dispatch(updateRoomLoading());
      const { id } = params;
      const response = await RoomAPI.getRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        dispatch(resetRooms());
        dispatch(getRoom(room));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateRoomLoading());
      getChatsProcess();
    }
  }

  // [Private] 다른 사용자가 방에 입장했을 때 방의 정보를 업데이트 하는 API 함수
  async function enterRoomProcess() {
    try {
      const { id } = params;
      const response = await RoomAPI.enterRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        dispatch(resetRooms());
        socket.emit('rooms:enter:server', { room, user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 사용자가 방에서 퇴장했을 때 방의 정보를 업데이트 하는 API 함수
  async function leaveRoomProcess() {
    try {
      const { id } = params;
      const response = await RoomAPI.leaveRoom({ roomId: id });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        dispatch(removeRoom());
        dispatch(resetChats());
        socket.emit('rooms:leave:server', { room, user });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 방의 마지막 멤버가 방에서 퇴장했을 때 방을 삭제하는 API 함수
  async function removeRoomProcess() {
    try {
      const response = await RoomAPI.removeRoom();
      const { ok, error, roomId } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && roomId) {
        dispatch(removeRoom());
        dispatch(resetChats());
        socket.emit('rooms:remove:server', roomId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 방에 입장했을 때 채팅 내역을 불러오는 API 함수
  async function getChatsProcess() {
    try {
      dispatch(updateChatsLoading());
      const response = await ChatAPI.getChats();
      const { ok, error, chats } = response;
      if (ok === false && error) dispatch(updateChatsError(error));
      if (ok === true && chats) {
        dispatch(getChats(chats));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateChatsLoading());
    }
  }

  // [Private] 방의 인원이 꽉찼을 때 게임을 시작하기 위해 생성하는 API 함수
  async function createGameProcess(roomId: number) {
    try {
      const response = await GameAPI.createGame();
      const { ok, error, game } = response;
      if (ok === false && error) dispatch(updateChatsError(error));
      if (ok === true && game) {
        socket.emit('games:create:server', { game, roomId });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 상황에 필요한 게임 순환을 업데이트 하기 위한 API 함수
  async function patchGameProcess(gameId: number, roomId: number) {
    try {
      const response = await GameAPI.patchGame({ id: String(gameId) });
      const { ok, error, game } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && game) {
        socket.emit('games:patch:game/2:server', { game, roomId });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 게임이 시작하면 유저의 역할을 랜덤으로 부여하기 위한 API 함수
  async function patchUserRoleProcess(roomId: number) {
    try {
      const response = await RoomAPI.createUserRole({ roomId });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        socket.emit('games:patch:user-role/2:server', room);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 낮 사이클이 되면 유저이 생존현황을 업데이트 하는 API 함수
  async function patchSurviveProcess(roomId: number, selectId: number) {
    try {
      const response = await RoomAPI.patchSurvive({ roomId, selectId });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true) {
        socket.emit('games:patch:survive/2:server');
      }
      if (ok === true && room) {
        socket.emit('games:patch:survive/2:server', room);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [Private] 밤 사이클이 끝나면 투표된 유저들을 상태에 담아두는 함수
  function patchGameVoteProcess(userId: number) {
    setVotedUserList((prev) => [...prev, userId]);
  }

  // [Private] 사용자가 방에 처음 입장했을 때 방의 정보를 가져오는 콜백 함수
  function updateRoomCallback(data: any) {
    dispatch(updateRoom(data));
    if (room) {
      reset({ title: room.title, totalHeadCount: String(room.totalHeadCount) });
    }
  }

  // [Private] 다른 사용자가 방에 입장했을 때 방의 정보를 업데이트 하는 콜백 함수
  function enterRoomCallback(data: any) {
    dispatch(enterRoom(data));
  }

  // [Private] 방에 입장한 유저를 Broadcast하는 콜백 함수
  function enterRoomBroadcastCb(data: User) {
    // const enterUserName = data.firstName ? `${data.firstName} ${data.lastName}` : data.nickname;
    setEnterUser(data);
  }

  // [Private] 다른 사용자가 방에서 퇴장했을 때 방의 정보를 업데이트 하는 콜백 함수
  function leaveRoomCallback(data: any) {
    dispatch(leaveRoom(data));
  }

  // [Private] 방에서 퇴장한 유저를 Broadcast하는 콜백 함수
  function leaveRoomBroadcastCb(data: User) {
    setleaveUser(data);
  }

  // [Private] 방의 마지막 멤버가 방에서 퇴장했을 때 방을 삭제하는 콜백 함수
  function removeRoomCallback() {
    dispatch(removeRoom());
  }

  // [Private] 채팅을 입력한 유저가 속한 방의 유저에게 해당 채팅을 전송하는 콜백 함수
  function createChatCallback(data: Chat) {
    dispatch(createChats(data));
  }

  // [Private] 게임을 생성한 방에 게임 데이터를 전달하는 콜백 함수
  function createGameCallback(data: Game) {
    dispatch(updateRoomGame(data));
  }

  // [Private] 게임에서 카운트다운을 동기화 하기 위한 콜백 함수
  function gameCountDownCallback(data: number) {
    setRecieveCountDown(data);
  }

  // [Private] 게임을 생성한 방에 게임 데이터를 전달하는 콜백 함수
  function patchGameCallback(data: Game) {
    dispatch(updateRoomGame(data));
  }

  // [Private] 게임이 시작되고 유저 역할이 정해지면 각 유저에게 역할을 전달하는 콜백 함수
  function patchUserRoleCallback(data: Room) {
    dispatch(updateRoom(data));
  }

  // [Private] 밤 사이클 중, 마피아가 유저를 클릭했을 때 어떤 유저가 클릭되었는지 전달하는 콜백 함수
  function selectUserCallback(userId: number) {
    setSelectCitizenId((prevUserId) => {
      if (prevUserId === userId) {
        return undefined;
      } else {
        return userId;
      }
    });
  }

  // [Private] 낮 사이클이 되면 마피아가 죽인 유저를 broadcasting 하는 콜백 함수
  function patchSurviveCallback(data: Room) {
    dispatch(updateRoom(data));
  }

  // [Private] 저녁 사이클이 끝나면 투표 결과를 반영하는 콜백 함수
  function patchGameVoteCallback(data: Room) {
    dispatch(updateRoom(data));
  }

  // [Header] Header 메뉴의 방 수정하기 버튼 클릭 시 발생하는 이벤트
  function onToggleModal() {
    setToggleModal(!toggleModal);
  }

  // [Header] Header 메뉴의 나가기 버튼 클릭 시 발생하는 이벤트
  function onLeaveRoomListClick() {
    history.push('/');
  }

  // [FormModal] Update Room Form이 유효한 경우 실행되는 함수
  async function onValid() {
    try {
      const { title, totalHeadCount } = getValues();
      const response = await RoomAPI.updateRoom({ title, totalHeadCount: +totalHeadCount });
      const { ok, error, room } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && room) {
        socket.emit('rooms:update:server', room);
        setToggleModal(!toggleModal);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // [ChatForm] Chat Form이 유효한 경우 실행되는 함수
  async function onChatValid() {
    try {
      const values = chatGetValues();
      const response = await ChatAPI.createChats(values);
      const { ok, error, chat } = response;
      if (ok === false && error) dispatch(updateRoomError(error));
      if (ok === true && chat) {
        socket.emit('chats:create:server', { roomId: params.id, data: chat });
      }
      chatReset({ content: '' });
    } catch (error) {
      console.log(error);
    }
  }

  // [UserList] 게임이 시작하고 마피아가 시민을 픽할 때 실행되는 함수
  function onUserListClick(userId: number, cycle: Cycle | null) {
    switch (cycle) {
      case Cycle.밤:
        socket.emit('games:select:user:server', {
          roomId: room?.id,
          userId,
          userList: room?.userList.map((user) => ({ id: user.id, role: user.role })),
        });
        break;
      case Cycle.저녁:
        setSelectUserId((prevUserId) => {
          if (prevUserId === userId) {
            return undefined;
          } else {
            return userId;
          }
        });
        break;
      default:
        break;
    }
  }

  const roomPageValue = {
    selfUserInRoom,
    onLeaveRoomListClick,
    countDown,
    onUserListClick,
    selectCitizenId,
    selectUserId,
  };

  const updateRoomFormValue = {
    register,
    handleSubmit,
    control,
    onValid,
    errors,
    isValid,
    toggleModal,
    onToggleModal,
  };

  const chatFormValue = {
    register: chatRegister,
    handleSubmit: chatHandleSubmit,
    control: chatControl,
    onValid: onChatValid,
    errors: chatErrors,
    isValid: chatIsValid,
  };

  // [Private] 카운트다운을 하기 위해 필요한 Hook
  useInterval(
    () => {
      if (room && room.game) {
        const substract = room.game.countDown - moment().unix();
        const duration = moment.duration(substract, 'seconds');
        if (duration.seconds() < 0) {
          setCountDown(0);
        } else {
          setCountDown(duration.seconds());
        }
      }
    },
    countDown !== -1 ? delay : null,
  );

  // [Private] 게임을 패치하기 위한 소켓 이벤트
  useEffect(() => {
    // 모든 유저에게 해당
    console.log(reciveCountDown);
    if (room && reciveCountDown === 0) {
      if (room.game.cycle === null && increment === -1) {
        setIncrement(0);
      }
      if (room.game.cycle === Cycle.밤 && increment === 0) {
        setIncrement(1);
        if (!isInit) {
          // 투표가 시작되기 전, 게임을 계속 진행하기 위해 상태 리셋
          socket.emit('games:patch:vote/1:server', { roomId: room.id, userId: selectUserId });
          setSelectUserId(undefined);
          setVotedUserList([]);
        }
      }
      if (room.game.cycle === Cycle.낮 && increment === 1) {
        setIncrement(2);
      }
      if (room.game.cycle === Cycle.저녁 && increment === 2) {
        setIncrement(3);
      }
      if (room.game.cycle === Cycle.저녁 && increment === 3) {
        // 밤 사이클로 돌아가 게임을 계속 진행하기 위해 상태 리셋
        setIncrement(0);
        setIsInit(false);
        setSelectCitizenId(undefined);
      }
    }
    // 방장만 해당
    if (currentUser?.host === true && room && reciveCountDown === 0) {
      if (room.game.cycle === null && increment === -1) {
        socket.emit('games:patch:game/1:server', {
          gameId: room.game.id,
          roomId: room.id,
        });
      }
      if (room.game.cycle === Cycle.밤 && increment === 0 && isInit) {
        socket.emit('games:patch:user-role/1:server', room.id);
      }
      if (room.game.cycle === Cycle.밤 && increment === 1) {
        socket.emit('games:patch:game/1:server', {
          gameId: room.game.id,
          roomId: room.id,
        });
      }
      if (room.game.cycle === Cycle.낮 && increment === 1) {
        socket.emit('games:patch:survive/1:server', { roomId: room.id, selectId: selectCitizenId });
      }
      if (room.game.cycle === Cycle.낮 && increment === 2) {
        socket.emit('games:patch:game/1:server', {
          gameId: room.game.id,
          roomId: room.id,
        });
      }
      if (room.game.cycle === Cycle.저녁 && increment === 3) {
        socket.emit('games:patch:game/1:server', {
          gameId: room.game.id,
          roomId: room.id,
        });
      }
    }
  }, [room?.game?.cycle, reciveCountDown, selectUserId]);

  // [Private] 저녁 사이클에서 투표가 완료되면 투표리스트를 서버로 전달
  useEffect(() => {
    if (votedUserList.length === room?.currentHeadCount) {
      socket.emit('games:patch:vote/2:server', { roomId: room.id, votedUserList });
    }
  }, [votedUserList]);

  // [Private] 카운트다운을 동기화시키기 위한 소켓 이벤트
  useEffect(() => {
    if (currentUser?.host) {
      socket.emit('games:countDown:server', { roomId: room?.id, countDown });
    }
  }, [countDown]);

  // [Private] 사용자 자신의 정보를 가져온다
  useEffect(() => {
    getSelfUserInRoom();
  }, [room?.userList]);

  // [Private] 클라이언트로부터 서버로 소켓 이벤트를 전달
  useEffect(() => {
    socket.emit('rooms:join-room:server', params.id);
    getRoomProcess();
    enterRoomProcess();
  }, []);

  useEffect(() => {
    if (user) {
      return () => {
        leaveRoomProcess();
        removeRoomProcess();
      };
    }
  }, [user]);

  // [Private] 방에 유저가 입장한 경우 Broadcast하여 알려준다
  useEffect(() => {
    if (enterUser) {
      const enterUserName = enterUser.firstName
        ? `${enterUser.firstName} ${enterUser.lastName}`
        : enterUser.nickname;
      toast(`${enterUserName}님이 입장하셨습니다`, {
        backgroundColor: '#323131',
        color: '#ffffff',
      });
    }
  }, [enterUser]);

  // [Private] 방에 유저가 퇴장한 경우 Broadcast하여 알려준다
  useEffect(() => {
    if (leaveUser) {
      const leaveUserName = leaveUser.firstName
        ? `${leaveUser.firstName} ${leaveUser.lastName}`
        : leaveUser.nickname;
      if (leaveUser !== currentUser) {
        toast(`${leaveUserName}님이 퇴장하셨습니다`, {
          backgroundColor: '#323131',
          color: '#ffffff',
        });
      }
    }
  }, [leaveUser?.id]);

  // [Private] 서버로부터 클라이언트에게 응답하는 소켓 이벤트
  useEffect(() => {
    // 클라이언트가 속한 방에서 모든 소켓이 Redux Store의 Room을 업데이트 한다
    socket.on('rooms:update:each-client', updateRoomCallback);
    // 누군가 방에 입장한 경우 room.userList에 새로운 유저를 추가한다
    socket.on('rooms:enter:each-client', enterRoomCallback);
    // 방에 입장한 유저를 braodcast한다
    socket.on('rooms:enter:broadcast-client', enterRoomBroadcastCb);
    // 누군가 방에서 퇴장한 경우 room.userList에서 유저를 삭제한다
    socket.on('rooms:leave:each-client', leaveRoomCallback);
    //방에 퇴장한 유저를 Broadcast한다
    socket.on('rooms:leave:broadcast-client', leaveRoomBroadcastCb);
    // 방의 마지막 멤버가 퇴장한 경우 해당 room을 삭제한다
    socket.on('rooms:remove:each-client', removeRoomCallback);
    // 클라이언트가 채팅을 입력하면 해당 방의 모든 유저에게 채팅을 전송한다
    socket.on('chats:create:each-client', createChatCallback);
    // 방의 최대 인원수가 꽉 찼을 때, 게임을 시작하기 위해 생성한다
    socket.on('games:create:only-self-client', createGameProcess);
    // 해당 방의 사용자에게 생성된 게임 데이터를 전달한다
    socket.on('games:create:each-client', createGameCallback);
    // 해당 방의 카운트다운을 동기화시킨다
    socket.on('games:countDown:client', gameCountDownCallback);
    // 게임 순환 및 유저 역할을 업데이트 한다
    socket.on('games:patch:game:self-client', patchGameProcess);
    socket.on('games:patch:user-role:self-client', patchUserRoleProcess);
    // 해당 방의 사용자에게 패치된 게임 데이터를 전달한다
    socket.on('games:patch:game:each-client', patchGameCallback);
    socket.on('games:patch:user-role:each-client', patchUserRoleCallback);
    // 밤 사이클 중, 마피아가 유저를 클릭했을 때 어떤 유저가 클릭되었는지 전달한다
    socket.on('games:select:user:each-client', selectUserCallback);
    // 밤 사이클이 끝나면, 유저의 생존목록을 업데이트 한다
    socket.on('games:patch:survive:self-client', patchSurviveProcess);
    socket.on('games:patch:survive:each-client', patchSurviveCallback);
    socket.on('games:patch:vote:host-client', patchGameVoteProcess);
    socket.on('games:patch:vote:each-client', patchGameVoteCallback);

    return () => {
      socket.off('rooms:update:each-client', updateRoomCallback);
      socket.off('rooms:enter:each-client', enterRoomCallback);
      socket.off('rooms:enter:broadcast-client', enterRoomBroadcastCb);
      socket.off('rooms:leave:each-client', leaveRoomCallback);
      socket.off('rooms:leave:broadcast-client', leaveRoomBroadcastCb);
      socket.off('rooms:remove:each-client', removeRoomCallback);
      socket.off('chats:create:each-client', createChatCallback);
      socket.off('games:create:only-self-client', createGameProcess);
      socket.off('games:create:each-client', createGameCallback);
      socket.off('games:countDown:client', gameCountDownCallback);
      socket.off('games:patch:game:self-client', patchGameProcess);
      socket.off('games:patch:user-role:self-client', patchUserRoleProcess);
      socket.off('games:patch:game:each-client', patchGameCallback);
      socket.off('games:patch:user-role:each-client', patchUserRoleCallback);
      socket.off('games:select:user:each-client', selectUserCallback);
      socket.off('games:patch:survive:self-client', patchSurviveProcess);
      socket.off('games:patch:survive:each-client', patchSurviveCallback);
      socket.off('games:patch:vote:host-client', patchGameVoteProcess);
      socket.off('games:patch:vote:each-client', patchGameVoteCallback);
    };
  }, []);

  return (
    <RoomPageContext.Provider value={roomPageValue}>
      <UpdateRoomFormContext.Provider value={updateRoomFormValue}>
        <ChatFormContext.Provider value={chatFormValue}>
          <Prompt message="게임을 나가시겠습니까? 게임중에는 다시 입장할 수 없습니다." />
          <RoomPagePresenter />
        </ChatFormContext.Provider>
      </UpdateRoomFormContext.Provider>
    </RoomPageContext.Provider>
  );
};
