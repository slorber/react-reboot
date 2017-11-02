import React from "react";
import Document, {Head, Main as NextMain, NextScript} from 'next/document'
import Link from 'next/link'

import {renderStatic} from 'glamor/server'
import {A, Div, Footer, Main, Header, Img} from "glamorous";
import 'babel-polyfill';
import 'whatwg-fetch';
import {
  AppName, AppTagline, AppTitle, AuthorTwitterHandle, BaseURL, GithubUrl, LogoUrl, MediaQueries, PageAbout,
  ScreenshotUrl
} from "constants";

export default class MyDocument extends Document {
  static async getInitialProps({renderPage}) {
    const page = renderPage();
    const styles = renderStatic(() => page.html);
    return {...page, ...styles};
  }

  constructor(props) {
    super(props);
    const {__NEXT_DATA__, ids} = props;
    if (ids) {
      __NEXT_DATA__.ids = this.props.ids;
    }
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <meta name="robots" content="index, follow"/>
          <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#"/>

          <title>{AppTitle}</title>
          <meta name="application-name" content={AppName}/>
          <meta name="twitter:title" content={AppName}/>
          <meta name="og:title" content={AppName}/>
          <meta property="og:site_name" content={AppName}/>

          <meta name="description" content={AppTitle}/>
          <meta name="twitter:description" content={AppTitle}/>
          <meta name="og:description" content={AppTitle}/>

          <meta property="og:url" content={BaseURL}/>
          <link rel="canonical" href={BaseURL}/>

          <meta name="thumbnail" content={ScreenshotUrl}/>
          <meta name="og:image" content={ScreenshotUrl}/>
          <meta name="twitter:image:src" content={ScreenshotUrl}/>

          <meta name="twitter:site" content={"@" + AuthorTwitterHandle}/>

          <link rel="shortcut icon" href="/static/favicon.ico"/>
          <link rel="stylesheet" href="/static/base.css"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.26.0/codemirror.min.css"/>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.30.0/theme/dracula.min.css"/>
          <style dangerouslySetInnerHTML={{__html: this.props.css}}/>
        </Head>
        <body>
          <ForkMe/>
          <AppTemplate/>
          <NextScript/>
        </body>
      </html>
    )
  }
}


const ForkMe = () => (
  <A
    href={GithubUrl}
  >
    <Img
      position="absolute"
      zIndex={11}
      top={0}
      right={0}
      border={0}
      src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
      alt="Fork me on GitHub"
      data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
      cursor="pointer"
      css={{
        transition: "all 0.2s ease-out",
        transform: "scale(1.0)",
        "&:hover": {
          transform: "scale(1.04)",
        },
        [MediaQueries.small]: {
          width: 120,
          height: 120,
        },
      }}
    />
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
      <AppHeaderSmall/>
      <AppHeaderLarge/>
    </Header>
    <Main
      css={{
        ...BaseCss,
        "& .next-main": BaseCss,
        "& #__next": BaseCss,
        "& [data-reactroot]": BaseCss,
      }}
    >
     <NextMain className="next-main"/>
    </Main>
    <Footer flex={0}>
      <AppFooter/>
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
    <Div
      flex={0}
      paddingLeft={10}
    >
      <AppLogo size={100}/>
    </Div>
    <Div
      flex={1}
      padding={20}
    >
      <Div
        display="flex"
        alignItems="baseline"
      >
        <Div fontSize={26} whiteSpace="nowrap">{AppName}</Div>
        <Div fontSize={26} margin="0 10px">-</Div>
        <Div fontSize={20}>{AppTagline}</Div>
      </Div>
      <Div
        marginTop={5}
      >
        <Div fontSize={14}>Refresh your react components with up-to-date syntax by simple copy-paste, cli or node API.</Div>
        <Div fontSize={14} marginTop={5}>This runs JsCodeShift, Babel, ESLint and Prettier with an opiniated config in a single tool.</Div>
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
      <AppLogo size={80}/>
    </Div>
    <Div
      flex={1}
      marginRight={50}
    >
      <Div
        fontSize={26}
      >
        {AppName}
      </Div>
      <Div fontSize={14}>
        {AppTagline}
      </Div>
    </Div>
  </Div>
);


const AppLogo = ({size}) => (
  <Img src={LogoUrl} width={size} height={size}/>
);

const AppFooter = () => (
  <Div
    padding={20}
    fontSize={12}
  >
    <Div>
      Made by <A href="https://twitter.com/sebastienlorber" color="cyan">{"@" + AuthorTwitterHandle}</A>
    </Div>
  </Div>
);


