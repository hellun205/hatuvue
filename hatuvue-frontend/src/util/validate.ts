export type DataType =
  | "video.name"
  | "video.description"
  | "video.author"
  | "user.username";

export const usernameRegex = new RegExp("[\\w|ㄱ-ㅎ가-힣]");

export const validate = (type: DataType, value: string): boolean => {
  switch (type) {
    case "user.username":
    case "video.author":
      if (!value) return false;
      else if (value.length > 12) return false;
      else if (!usernameRegex.test(value)) return false;
      return true;

    case "video.description": {
      if (!value) return false;
      else if (value.length > 65535) return false;
      return true;
    }

    case "video.name": {
      if (!value) return false;
      else if (value.length > 24) return false;
      return true;
    }

    default:
      return true;
  }
};
