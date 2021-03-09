import * as React from "react";
import styled from "styled-components";
import { Formik } from "formik";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Card = styled.div`
  max-width: 500px;
  width: 100%;
  height: 440px;
  background-color: #fff;
  margin: 100px 20px 0;
`;
const Inner = styled.div`
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
  padding-top: 80px;
`;
const Title = styled.h2`
  margin-bottom: 40px;
  font-size: 20px;
  font-weight: bold;
`;
const FieldWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
const PasswordResetLink = styled(Link)`
  position: absolute;
  bottom: -20px;
  width: 100%;
  font-size: 12px;
  color: #000;
  text-align: right;
  text-decoration: none;
`;

type Props = {
  validationSchema: () => void;
  onSubmit: (values: { email: string; password: string }) => void;
};

const Top: React.SFC<Props> = ({ validationSchema, onSubmit }: Props) => {
  return (
    <Wrapper>
      <Card>
        <Inner>
          <Title>ログイン</Title>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values: { email: string; password: string }) =>
              onSubmit(values)
            }
            validationSchema={validationSchema}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <FieldWrapper>
                  <input type="email" name="email" />
                </FieldWrapper>
                <FieldWrapper>
                  <input type="password" name="password" />
                  <PasswordResetLink to="/">
                    パスワードを忘れた場合
                  </PasswordResetLink>
                </FieldWrapper>
                <button type="submit">送信</button>
              </form>
            )}
          </Formik>
        </Inner>
      </Card>
    </Wrapper>
  );
};

export default Top;
