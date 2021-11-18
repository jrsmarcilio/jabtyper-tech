export interface IPhrases {
  text: string;
  author: string;
}
export interface IUserInfo {
  name: string;
  wps: number;
}

export interface IModalOptions {
  show: boolean;
  onClose?: () => void;
  wps: number;
}

export interface ICounterWps {
  correctWordTester: number;
}

export type InputsSaveProgress = {
  username: string;
  wps: number;
};
