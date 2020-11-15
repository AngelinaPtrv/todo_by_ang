import React, {Component} from "react";

import RepoList from "../RepoList/RepoList";
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import {CardContent} from "@material-ui/core";

import styles from "./About.module.css";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {keys} from "@material-ui/core/styles/createBreakpoints";

const name = 'AngelinaPtrv';
const URL = 'https://api.github.com/users/' + name;

export default class About extends Component {
  state = {
    avatar: '',
    name: '',
    bio: '',
    profile: '',
    isLoading: true,
    reposUrl: '',
    fetchRequest: false,
    loadFailure: false,
    works: {
      axion: 'https://webheroschool.github.io/Axion.githab.io/',
      game: 'https://gamefindbugang-git-gamefindbug.whs123.vercel.app/'
    }
  }

  componentDidMount() {
    fetch(URL)
        .then(resolve => resolve.ok
          ? resolve.json()
          : Promise.reject())
        .then((json) => {
          this.setState({
            avatar: json.avatar_url,
            name: json.name,
            bio: json.bio,
            profile: json.html_url,
            reposUrl: json.repos_url,
            fetchRequest: true,
            isLoading: false
          });
        }).catch(() => {
          this.setState({
            loadFailure: true,
            isLoading: false
          })
          console.clear();
        });
  }

  render() {
    const {avatar, name, bio, profile, reposUrl, works, isLoading, fetchRequest, loadFailure} = this.state;
    return (
      <div className={styles.wrap}>
        {!isLoading && fetchRequest &&
        <div>
          <Card className={styles.card}>
            <img src={avatar} alt="avatar" className={styles.avatar}/>
            <CardContent className={styles.descr}>
              <div className={styles.name}>{name}</div>
              <div className={styles.bio}>{bio}</div>
              <a href={profile} className={styles.profile}>my profile</a>
              <div>My projects</div>
              <div>
                {Object.keys(works).map(keyUrl => (
                  <a href={works[keyUrl]} key={keyUrl} className={styles.project}>{keyUrl}</a>
                ))}
              </div>
            </CardContent>
          </Card>
          <RepoList reposUrl={reposUrl}/>
        </div>
        }
      </div>
    )
  }
}