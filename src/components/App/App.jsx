import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import { GrLinkedin, GrMedium, GrGithub } from 'react-icons/gr';
import { IconContext } from 'react-icons';
import theme from '../../js/theme';
import PersonaInfo from '../PersonalInfo/PersonaInfo';
import Skill from '../Skill/Skill';
import Portfolio from '../Portfolio/Portfolio';
import Contact from '../Contact/Contact';
import './App.less';

function App() {
  function renderIcons() {
    return (
      <IconContext.Provider value={{ color: 'fff', size: '20px' }}>
        <div className="icon-group">
          <ul>
            <li>
              <a
                className="linkedin"
                target="_blank"
                href="https://www.linkedin.com/in/yu-an-chang-71b198132/"
                rel="noreferrer"
                title="LinkedIn"
              >
                <GrLinkedin />
              </a>
            </li>
            <li>
              <a
                className="medium"
                target="_blank"
                href="https://andytacochang.medium.com/"
                rel="noreferrer"
                title="Medium"
              >
                <GrMedium />
              </a>
            </li>
            <li>
              <a
                className="github"
                target="_blank"
                href="https://github.com/andy-yuanchang"
                rel="noreferrer"
                title="Github"
              >
                <GrGithub />
              </a>
            </li>
          </ul>
        </div>
      </IconContext.Provider>
    );
  }

  function renderBubbles() {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr[i] = (
        <div>
          <span className="dot" />
        </div>
      );
    }
    return arr;
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="app">
        <PersonaInfo />
        <Skill />
        <Portfolio />
        <Contact />
        {renderIcons()}
        <div className="sea-world-wrapper">
          {renderBubbles()}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
