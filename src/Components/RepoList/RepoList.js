import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './RepoList.module.css';
import {StarBorderOutlined} from "@material-ui/icons";

export default class RepoList extends Component {
  state =  {
    repos: [],
    isLoading: true,
    fetchRequest: false,
    loadFailure: false
  }

  addRepo = (data) => {
    const newItem = {
      name: data.name,
      repoUrl: data.html_url,
      description: data.description,
      technology: data.language,
      id: data.id
    }
     if (this.state.repos) {
       this.setState(({repos}) => {
         const arrItems = [...repos, newItem];
         return {
           repos: arrItems
         }
       })
     } else {
         this.setState((repos) => {
           return {
             repos: newItem
           }
         })
     }
  }


  componentDidMount() {
    fetch(this.props.reposUrl)
    .then(resolve => resolve.json())
    .then((json) => {
      json.map((elem) =>  {
        this.addRepo(elem);
      });
      this.setState({
        isLoading: false,
        fetchRequest: true
      })
    }).catch(() => {
        this.setState({
          loadFailure: true,
          isLoading: false})
    });
  }

  render() {
    return (
      <Card className={styles.wrap}>
        {!this.state.isLoading && this.state.fetchRequest &&
        this.state.repos.map((repo) => (
          <div key={repo.id} className={styles.item}>
            <StarBorderOutlined color="primary"/>
            <div className={styles.repo}>
              <a href={repo.repoUrl} className={styles.link}>{repo.name}</a>
              <div className={styles.descr}>{repo.description}</div>
              <div className={styles.lang}>{repo.technology}</div>
            </div>
          </div>
        ))}
      </Card>
    )
  }
}