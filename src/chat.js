

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
const jid = ""
const token = ""

// 2.2. Initialize converse with credentials
converse.initialize({
      theme: 'langexchange',
      auto_away: 300,
      enable_smacks: true,
      loglevel: 'debug',
      omemo_default: false,
      prune_messages_above: 100,
      message_archiving: 'always',
      keepalive: true,
      view_mode: 'overlayed',
      websocket_url: 'ws://localhost:5280/ws',
      whitelisted_plugins: ['converse-debug', 'converse-langex-chat', 'langex-audio-toolkit', 'converse-correctview', 'converse-langex-audiobot'],
      allow_non_roster_messaging: true,
      allow_message_corrections: false,
      render_media: true,
      auto_login: true,
      jid: jid,
      password: token,
});

// 2.3. Logout user:
// await window.converse.logout()