import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Home, MovieDetail, Movies } from '../../pages';
import { Header, Footer } from '../../components';

function Routes() {
  return (
    <Router>
      <div style={{ minHeight: '100vh' }}>
        <Header />
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={300}
            >
              <Switch location={location}>
                <Route exact path="/" component={Home} />
                <Route path="/movies" component={Movies} />
                <Route path="/:type/:id" component={MovieDetail} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
        <Footer />
      </div>
      <style jsx global>{`
        body {
          background-color: #000000;
          margin: 0;
          padding: 0;
        }
      `}</style>
      <style jsx>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 300ms ease-in;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 300ms ease-in;
        }
      `}</style>
    </Router>
  );
}

export default Routes;
