import { Client } from "@elastic/elasticsearch";
import { esHost, esPass, esUser } from "../config/vars.js";

class EsInstance {
  constructor() {
    if (!this.instance) {
      let configs = { node: esHost };
      if (esUser && esPass) {
        configs.auth = {
          password: esPass,
          username: esUser,
        };
      }

      this.instance = new Client(configs);
    }
  }

  getInstance() {
    return this.instance;
  }
}

const singletonEsInstance = new EsInstance();
Object.freeze(singletonEsInstance);
export default singletonEsInstance;
