import * as React from "react";
import { useHistory } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

type Props = {
  children: React.ReactChild[] | React.ReactNode;
};

const LoginChecker: React.SFC<Props> = ({ children }: Props) => {
  const history = useHistory();
  const isLoggedIn = true;

  React.useEffect(() => {
    const failure = (): void => history.push("/login");
    console.log(failure);
  }, []);

  if (!isLoggedIn) return <CircularProgress />;
  return <>{children}</>;
};

export default LoginChecker;
