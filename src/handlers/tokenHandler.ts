import setEnv from '../config/dotenv';
import { createTokenVar } from '../utils/setVariable';
setEnv();

class TokenHandler {
  token: string | undefined = undefined;

  getToken = (): string | undefined => {
    if (process.env.ODS_SAURON_TOKEN) {
      this.token = process.env.ODS_SAURON_TOKEN;
    }
    return this.token;
  };

  setToken = (TOKEN: string) => {
    this.token = TOKEN;
    createTokenVar(TOKEN);
  };
}
const tokenHandler = new TokenHandler();

export { tokenHandler };
