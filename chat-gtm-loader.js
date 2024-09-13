/**
 * Represents an AIHubChatLoader.
 * @class AIHubChatLoader
 */
class AIHubChatLoader {
  constructor(apiKey, agentCode) {
    this.apiKey = apiKey;
    this.agentCode = agentCode;
    this.baseURL = "https://api.serenitystar.ai/api";
    this.elementId = "aihub-chat";
    this.staticResourcesBaseURL = "https://hub.serenitystar.ai";
  }

  async init() {
    await this.loadCSS();
    await this.loadScript();
    this.initChatComponent();
  }

  async loadCSS() {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    const isValidVersion = this.checkIfVersionIsValid();
    linkElement.href = isValidVersion
      ? `${this.staticResourcesBaseURL}/resources/${this.version}/chat.css`
      : `${this.staticResourcesBaseURL}/resources/chat.css`;
    document.head.appendChild(linkElement);
  }

  async loadScript() {
    const _self = this;
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      const isValidVersion = _self.checkIfVersionIsValid();

      scriptElement.src = isValidVersion
        ? `${_self.staticResourcesBaseURL}/resources/${_self.version}/chat.js`
        : `${_self.staticResourcesBaseURL}/resources/chat.js`;
      scriptElement.onload = resolve;
      scriptElement.onerror = reject;
      document.body.appendChild(scriptElement);
    });
  }

  initChatComponent() {
    const chatContainerId = this.elementId;
    if (!document.getElementById(chatContainerId)) {
      const chatDiv = document.createElement("div");
      chatDiv.id = chatContainerId;
      document.body.appendChild(chatDiv);
    }

    const chat = new AIHubChat(chatContainerId, {
      apiKey: this.apiKey,
      agentCode: this.agentCode,
      baseURL: this.baseURL,
    });
    chat.init();
  }

  checkIfVersionIsValid() {
    if (!this.version) {
      return false;
    }

    const versionPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}$/;

    return versionPattern.test(this.version);
  }
}

function loadSerenityChat(apiKey, agentCode) {
  const chatLoader = new AIHubChatLoader(apiKey, agentCode);
  chatLoader.init();
}

window.loadSerenityChat = loadSerenityChat;
