import React, {Component} from "react";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

import Card from "@material-ui/core/Card";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Todo from "../Todo/Todo";
import About from "../About/About";

import styles from "./App.module.css";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className={styles.wrap}>
          <Card>
            <List className={styles.links}>
              <Link to='/' className={styles.link}>
                <ListItem button>
                  <ListItemText primary='About'/>
                </ListItem>
              </Link>
              <Link to='/todo' className={styles.link}>
                <ListItem button>
                  <ListItemText primary='Todo'/>
                </ListItem>
              </Link>
            </List>
          </Card>
          <Card className={styles.card}>
            <Route path='/' exact component={About}/>
            <Route path='/todo' component={Todo}/>
          </Card>
        </div>
      </Router>
    )
  }
}
