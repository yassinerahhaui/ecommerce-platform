const chatRoomsBtn = selectEl('.chat-rooms-btn');
const chatRooms = selectEl('.chat-rooms');
const chatRoomBox = selectEl('.chat-room-box');


chatRoomsBtn.onclick = () => {
  if (chatRooms.style.display === 'block') {
    chatRooms.style.display = 'none';
    chatRoomBox.style.display = 'none';
  } else {
    chatRooms.style.display = 'block';
    chatRoomBox.style.display = 'block';
    chatRooms.textContent = '';
    fetchUsers();
  }
}
const fetchChatRooms = async () => {
  const response = await fetch('/chat/rooms',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
  });
  const data = await response.json();
  return data
}

const fetchUsers = async () => {
  const messages = selectEl('.chat-rooms');
  is_loading(messages);
  const users = await fetchChatRooms();
  users ? messages.textContent = '' : '';
  users.rooms !== "somthing is wrong!" ? users.rooms.map((user)=> {
    const image = newEl('img');
    let username = '';
    let imgsrc = ''
    if (users.active_user === user.user_name) {
      username = user.seler_name
      if (user.seler_image) {
        image.src = `${siteName}/media/${user.seler_image}`;
        imgsrc = `${siteName}/media/${user.seler_image}`;
      } else {
        if (user.seler_gender === 'MEN') {
          image.src = `${siteName}/static/images/no_profile/men.png`;
          imgsrc = `${siteName}/static/images/no_profile/men.png`;
        } else {
          image.src = `${siteName}/static/images/no_profile/women.png`;
          imgsrc = `${siteName}/static/images/no_profile/women.png`;
        }
      }
      image.title = user.seler_name;
      image.alt = user.seler_name;
    } else {
      username = user.user_name
      if (user.user_image) {
        image.src = `${siteName}/media/${user.user_image}`;
        imgsrc = `${siteName}/media/${user.user_image}`;
      } else {
        if (user.user_gender === 'MEN') {
          image.src = `${siteName}/static/images/no_profile/men.png`;
          imgsrc = `${siteName}/static/images/no_profile/men.png`;
        } else {
          image.src = `${siteName}/static/images/no_profile/women.png`;
          imgsrc = `${siteName}/static/images/no_profile/women.png`;
        }
      }
      image.title = user.user_name;
      image.alt = user.user_name;
    }
    image.addEventListener('click',async() => {
      chatRoom(imgsrc,username,user.id);
    })

    setClass(image,'messages-user-img');
    setChild(messages,image);
  }) : '';
}
fetchUsers();

const chatRoom = async (image,username,roomId) => {
  const roomBoxHeader = selectEl('.chat-room-box__header');
  const roomBoxBody = selectEl('.chat-room-box__body');
  const userRoomBox = newEl('div');
  setClass(userRoomBox,username);
  const closeBtn = newEl('span');
  const closeIcon = newEl('i');
  setClass(closeIcon,'fa-solid fa-xmark');
  setClass(closeBtn,'close-room');
  is_loading(userRoomBox);
  const userRoom = setInterval(async()=> {
    const messages = await fetchRoomMessages(roomId);
    messages ? userRoomBox.textContent = '': '';
    if (messages.messages.length > 0) {
      messages.messages.map((msg)=> {
        const msgBox = newEl('ul');
        const msgText = newEl('li');
        setClass(msgText,'text-msg');
        msgText.innerHTML = msg.message;
        setChild(msgBox,msgText);
        if (parseInt(messages.active_user) === msg.user_id) {
          setClass(msgBox,'active-user-msg');
        } else {
          setClass(msgBox,'other-user-msg');
        }
        setChild(userRoomBox,msgBox);
      })
    }

    roomBoxBody.scrollTop === 0 ? roomBoxBody.scrollTop = roomBoxBody.scrollHeight:'';
  },1000)
  roomBoxBody.textContent = '';
  setChild(roomBoxBody,userRoomBox);
  const profileImage = newEl('img');
  const userName = newEl('span');
  setClass(profileImage,'image-profile');
  setClass(userName,'username-profile');
  roomBoxHeader.textContent = '';
  userName.innerHTML = username;
  profileImage.src = image;
  
  setChild(closeBtn,closeIcon);
  setChild(roomBoxHeader,profileImage);
  setChild(roomBoxHeader,userName);
  setChild(roomBoxHeader,closeBtn);
  const sendMsgBtn = selectEl('.send-message-btn');
  const message = selectEl('.message-content');
  closeBtn.onclick = () => {
    clearInterval(userRoom);
    roomBoxHeader.textContent = '';
    roomBoxBody.textContent = '';
    chatRooms.style.display = 'none';
    chatRoomBox.style.display = 'none';
  }
  sendMsgBtn.onclick = () => {
    sendMessage(roomId,message.value);
    roomBoxBody.scrollTop = roomBoxBody.scrollHeight;
    message.value = '';
  }
  message.onkeyup = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      sendMessage(roomId,message.value);
      roomBoxBody.scrollTop = roomBoxBody.scrollHeight;
      message.value = '';
    }
  }
  roomBoxBody.scrollTop = roomBoxBody.scrollHeight;
}

const fetchRoomMessages = async (roomId) => {
  const response = await fetch(`/chat/room/${roomId}/messages`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    }
  });
  const data = await response.json();
  return data;
}
const sendMessage = async (roomId,msg) => {
  const response = await fetch(`/chat/room/${roomId}/message/send`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({'message':msg})
  })
  const data = await response.json();
}