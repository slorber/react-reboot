import Document, {Head, Main, NextScript} from 'next/document'
import Link from 'next/link'

import {renderStatic} from 'glamor/server'
import {A, Div, Footer, Header, Img} from "glamorous";
import 'babel-polyfill';
import 'whatwg-fetch';
import {AppName, AppTitle, PageAbout} from "constants";

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
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={AppTitle}/>
          <meta name="application-name" content={AppName} />
          <meta name="twitter:title" content={AppName} />
          <meta name="twitter:description" content={AppTitle}/>
          <meta name="og:title" content={AppName} />
          <meta name="og:description" content={AppTitle}/>
          <meta name="og:image" content="/static/banner.png" />
          <title>{AppTitle}</title>
          <link rel="shortcut icon" href="/static/favicon.ico" />
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
  <A href="https://github.com/slorber/react-reboot">
    <Img
      position="absolute"
      zIndex={11}
      top={0}
      right={0}
      border={0}
      src="https://camo.githubusercontent.com/e7bbb0521b397edbd5fe43e7f760759336b5e05f/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677265656e5f3030373230302e706e67"
      alt="Fork me on GitHub"
      data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
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
    <Div flex={0}>
      <AppHeader/>
    </Div>
    <Div
      css={{
        ...BaseCss,
        "& .next-main": BaseCss,
        "& #__next": BaseCss,
        "& [data-reactroot]": BaseCss,
      }}
    >
     <Main className="next-main"/>
    </Div>
    <Div flex={0}>
      <AppFooter/>
    </Div>
  </Div>
);

const AppHeader = () => (
  <Header
    display="flex"
  >
    <Div
      padding={20}
      flex={1}
    >
      <Div
        padding={5}
        fontSize={28}
      >
        {AppTitle}
      </Div>
      <Div
        padding={5}
      >
        <Div fontSize={16}>Refresh your react components with up-to-date syntax by simple copy-paste, cli or node API.</Div>
        <Div fontSize={12} marginTop={5}>This runs JsCodeShift, Babel, ESLint and Prettier with an opiniated config in a single tool.</Div>
      </Div>
    </Div>
    <Div
      flex={0}
      marginRight={150}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/*<Link href={PageAbout}>About</Link>*/}
    </Div>
  </Header>
);

const AppFooter = () => (
  <Footer
    padding={20}
    fontSize={12}
  >
    <Div>
      Made by <A href="https://twitter.com/sebastienlorber" color="cyan">@sebastienlorber</A>
    </Div>
  </Footer>
);


