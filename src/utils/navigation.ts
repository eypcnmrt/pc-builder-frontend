type NavigateFn = (path: string) => void;

let _navigate: NavigateFn | null = null;

export const setNavigate = (fn: NavigateFn): void => {
  _navigate = fn;
};

export const navigateTo = (path: string): void => {
  if (_navigate) {
    _navigate(path);
  } else {
    window.location.href = path;
  }
};
