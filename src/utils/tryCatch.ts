import { RestError } from "./error";

export const tryCatch = (controller) => async (req, res) => {
    try {
      await controller(req, res);
    } catch (err) {
      return RestError.manageServerError(res, err);
    }
}