import Document, {Head, Main, NextScript} from 'next/document'

import {renderStatic} from 'glamor/server'
import {Div, Footer, Header} from "glamorous";
import 'babel-polyfill';
import 'whatwg-fetch';
import {AppName, AppTitle} from "constants";

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
          <AppTemplate/>
          <NextScript/>
        </body>
      </html>
    )
  }
}



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
    padding={20}
    fontSize={20}
  >
    {AppTitle}
  </Header>
);

const AppFooter = () => (
  <Footer
    padding={20}
    fontSize={20}
  >
    Footer
  </Footer>
);


