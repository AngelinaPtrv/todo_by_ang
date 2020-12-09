import React, { Component } from "react";

import Card from '@material-ui/core/Card';
import Pagination from "@material-ui/lab/Pagination";
import CircularProgress from '@material-ui/core/CircularProgress';
import {StarBorderOutlined} from "@material-ui/icons";

import styles from './RepoList.module.css';

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
      language_url: data.languages_url,
      lang: [],
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
         this.setState(() => {
           return {
             repos: newItem
           }
         })
     }
  }

  addLang = (url, data) => {
    const languages = [];
    languages.push(Object.keys(data));
    const index = this.state.repos.findIndex(item => item.language_url === url);
    const old = this.state.repos[index];
    const newItem = {...old, lang: languages};
    const newRepos = [...this.state.repos.slice(0, index), newItem, ...this.state.repos.slice(index + 1)];
    this.setState({
        repos: newRepos
    });
  }

  componentDidMount() {
      fetch(this.props.reposUrl)
        .then(resolve => resolve.json())
        .then(json => {
          this.setState({
            isLoading: false,
            fetchRequest: true
          });
          json.map(elem => this.addRepo(elem))
        })
            .then(() => {
              this.state.repos.map(item => {
                fetch(item.language_url)
                  .then(resolve => resolve.json())
                  .then(json => {
                    this.addLang(item.language_url, json);
                  })
              })
            })
        .catch(() => {
          this.setState({
            loadFailure: true,
            isLoading: false
          })
        })
  }

  render() {
    const {isLoading, fetchRequest, repos} = this.state;
    return (
      <Card>
        {isLoading ?
          <div className={styles.progress}>
            <CircularProgress/>
          </div> :
          fetchRequest && repos.map((repo) => (
            <div key={repo.id} className={styles.item}>
              <StarBorderOutlined color="primary"/>
              <div className={styles.repo}>
                <a href={repo.repoUrl} className={styles.link}>{repo.name}</a>
                <div className={styles.descr}>{repo.description}</div>
                <div className={styles.langs}>
                  {repo.lang.map((item) =>
                    item.map((item, index)=> (<div key={index} className={styles.lang}>{item}</div>))
                  )}
                </div>
              </div>
            </div>
          ))
        }
        <Pagination
          size="small"
          className={styles.pagination}/>
      </Card>
    )
  }
}