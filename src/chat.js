//1. After the user logins, add this link
/* <link rel="shortcut icon" type="image/ico" href="<process.env.REACT_APP_CHATSERVICE>/favicon.ico"/>
  <script src="https://cdn.conversejs.org/3rdparty/libsignal-protocol.min.js"></script>
  <script defer="defer" src="<process.env.REACT_APP_CHATSERVICE>/scripts/langex.min.js"></script>
  <link href="<process.env.REACT_APP_CHATSERVICE>/styles/converse.min.css" rel="stylesheet">/} */

//

//2. Then call this scripts
// 2.1. First get jid, and token from local storage
// const jid = localStorage.getItem("jid")
// const token = localStorage.getItem("token")
const jid = "";
const token = "";

// 2.2. Initialize converse with credentials

// 2.3. Logout user:
// await window.converse.logout()
//
const initChat = () => {
      console.log("INIT CHAT");
      const jid = localStorage.getItem("jid");
      const token = localStorage.getItem("token");
      window.converse.initialize({
            theme: "langexchange",

            auto_away: 300,
            enable_smacks: true,
            loglevel: "debug",
            omemo_default: false,
            prune_messages_above: 100,
            message_archiving: "always",
            keepalive: true,
            view_mode: "overlayed",
            // websocket_url: "ws://localhost:5280/ws",
            whitelisted_plugins: [
                  "converse-debug",
                  "converse-langex-chat",
                  "langex-audio-toolkit",
                  "converse-correctview",
                  "converse-langex-audiobot",
            ],
            allow_non_roster_messaging: true,
            allow_message_corrections: false,
            render_media: true,
            allow_logout: false,
            show_client_info: false,
            allow_adhoc_commands: false,
            allow_contact_requests: false,
            clear_cache_on_logout: true,
            jid: jid,
            password: token,
            sounds_path: "/assets/sounds/",
            auto_reconnect: true,
            credentials_url: "http://localhost:5002/api/cookies/credentials",
            authentication: "login",
      });
};

const destroyChat = async () => {
      console.log("DESTROY CHAT");
      hideChat();
      await window.converse.logout();
};

const loginChat = async () => {
      console.log("LOGIN CHAT");
      const jid = localStorage.getItem("jid");
      const token = localStorage.getItem("token");
      showChat();

      await window.converse.login(jid, token);
};

const hideChat = () => {
      const conversejs = document.getElementById("conversejs");
      if (conversejs) conversejs.style.display = "none";
};

const showChat = () => {
      const conversejs = document.getElementById("conversejs");
      if (conversejs) conversejs.style.display = "block";
};

export { initChat, destroyChat, loginChat, hideChat, showChat };

// 2.3. Logout user:
// await window.converse.logout()

// aee427fa-c58c-4662-b959-30ad0e8b0a2a@localhost
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFlZTQyN2ZhLWM1OGMtNDY2Mi1iOTU5LTMwYWQwZThiMGEyYSIsInR5cCI6ImN1c3RvbWVyIiwiaW5jaWQiOiIzIiwidW5hbWUiOiJoZWxsbzEyMyIsIm5iZiI6MTY4MzYyMjg3NCwiZXhwIjoxNjg0MjI3Njc0LCJpYXQiOjE2ODM2MjI4NzR9.zqofAL3TYwBy6E3XK4YBRItgXujIdsMnf1pm4nW9NmQ
