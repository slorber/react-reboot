import React from "react";
import Document, { Head, Main as NextMain, NextScript } from "next/document";
import flush from "styled-jsx/server";

import Link from "next/link";

import { renderStatic } from "glamor/server";
import { A, Div, Footer, Main, Header, Img } from "glamorous";
import "babel-polyfill";
import "whatwg-fetch";
import {
  AppName,
  AppTagline,
  AppTitle,
  AuthorTwitterHandle,
  BaseURL,
  GithubUrl,
  LogoUrl,
  MediaQueries,
  PageAbout,
  ScreenshotUrl,
  Color0,
  Color1,
  Color2,
  Color3,
} from "constants";
import { hover } from "glamor";

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return {
      ...page,
      ...styles,
      jsxStyleCss: flush(),
    };
  }

  constructor(props) {
    super(props);
    const { __NEXT_DATA__, ids } = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content="index, follow" />
          <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#" />

          <title>{AppTitle}</title>
          <meta name="application-name" content={AppName} />
          <meta name="twitter:title" content={AppName} />
          <meta name="og:title" content={AppName} />
          <meta property="og:site_name" content={AppName} />

          <meta name="description" content={AppTitle} />
          <meta name="twitter:description" content={AppTitle} />
          <meta name="og:description" content={AppTitle} />

          <meta property="og:url" content={BaseURL} />
          <link rel="canonical" href={BaseURL} />

          <meta name="thumbnail" content={ScreenshotUrl} />
          <meta name="og:image" content={ScreenshotUrl} />
          <meta name="twitter:image:src" content={ScreenshotUrl} />

          <meta name="twitter:site" content={"@" + AuthorTwitterHandle} />

          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/base.css" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/dracula.min.css"
          />
          <style dangerouslySetInnerHTML={{ __html: this.props.css }} />
          {this.props.jsxStyleCss}
        </Head>
        <body>
          <ForkMe />
          <AppTemplate />
          <NextScript />
        </body>
      </html>
    );
  }
}

const ForkMe = () => (
  <A
    href={GithubUrl}
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      display: "block",
      width: 130,
      height: 130,
      overflow: "hidden",
    }}
  >
    <Div
      css={{
        position: "absolute",
        top: 35,
        right: -95,
        zIndex: 666,
        background: "#6BD9EE",
        color: "#20232A",
        lineHeight: "33px",
        height: 33,
        fontSize: 12,
        fontWeight: 600,
        width: 300,
        textAlign: "center",
        transform: "rotate(45deg)",
        transition: "all .3s ease-in-out",
        "&:hover": {
          background: Color1,
        },
      }}
    >
      Fork me on GitHub
    </Div>
  </A>
);
/*
      width={120}
      height={120}
 */

const BaseCss = {
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const AppTemplate = () => (
  <Div
    flex={1}
    width="100%"
    minHeight="100%"
    display="flex"
    flexDirection="column"
  >
    <Header flex={0}>
      <AppHeaderSmall />
      <AppHeaderLarge />
    </Header>
    <Main
      css={{
        ...BaseCss,
        "& .next-main": BaseCss,
        "& #__next": BaseCss,
        "& [data-reactroot]": BaseCss,
      }}
    >
      <NextMain className="next-main" />
    </Main>
    <Footer flex={0}>
      <AppFooter />
    </Footer>
  </Div>
);

const AppHeaderLarge = () => (
  <Div
    css={{
      display: "none",
      [MediaQueries.large]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 20px",
      },
    }}
  >
    <Div flex={0}>
      <AppLogo size={100} />
    </Div>
    <Div flex={1} padding={20}>
      <Div display="flex" alignItems="baseline">
        <Div
          whiteSpace="nowrap"
          style={{
            color: Color3,
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          {AppName}
        </Div>
        <Div style={{ color: Color2, fontWeight: 600, margin: (0, 8) }}>-</Div>
        <Div style={{ color: Color1, fontWeight: 600 }}>{AppTagline}</Div>
      </Div>
      <Div marginTop={5}>
        <Div fontSize={14} style={{ color: Color0 }}>
          Refresh your react components with up-to-date syntax by simple
          copy-paste, cli or node API.
        </Div>
        <Div fontSize={14} marginTop={5} style={{ color: Color0 }}>
          This runs JsCodeShift, Babel, ESLint and Prettier with an opiniated
          config in a single tool.
        </Div>
      </Div>
    </Div>
    <Div
      flex={0}
      marginRight={80}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/*<Link href={PageAbout}>About</Link>*/}
    </Div>
  </Div>
);

const AppHeaderSmall = () => (
  <Div
    css={{
      display: "none",
      [MediaQueries.small]: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 20px",
      },
    }}
  >
    <Div flex={0}>
      <AppLogo size={70} />
    </Div>
    <Div flex={1} padding={20}>
      <Div
        style={{
          color: Color3,
          fontWeight: 600,
          fontSize: 20,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        {AppName}
      </Div>
      <Div style={{ color: Color1, fontWeight: 600, marginTop: 4 }}>
        {AppTagline}
      </Div>
    </Div>
  </Div>
);

const AppLogo = ({ size }) => <Img src={LogoUrl} width={size} height={size} />;

const AppFooter = () => (
  <Div padding={20} fontSize={12} style={{ color: Color0 }}>
    <Div>
      Made by{" "}
      <A
        href="https://twitter.com/sebastienlorber"
        css={{
          color: Color2,
          transition: "all .3s ease-in-out",
          "&:hover": {
            color: Color1,
          },
        }}
      >
        {"@" + AuthorTwitterHandle}
      </A>
    </Div>
  </Div>
);
