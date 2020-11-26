import React, {Component} from "react";

import RepoList from "../RepoList/RepoList";
import Card from '@material-ui/core/Card';
import {CardContent} from "@material-ui/core";
import GitHub from "../Icons/GitHub";
import Telegram from "../Icons/Telegram";

import styles from "./About.module.css";

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
      'site layout': 'https://webheroschool.github.io/Axion.githab.io/',
      game: 'https://gamefindbugang-git-gamefindbug.whs123.vercel.app/'
    }
  };

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
    const {avatar, name, bio, profile, reposUrl, works, isLoading, fetchRequest} = this.state;
    return (
      <div className={styles.wrap}>
        {!isLoading && fetchRequest &&
        <div>
          <Card className={styles.card}>
            <img src={avatar} alt="avatar" className={styles.avatar}/>
            <CardContent className={styles.descr}>
              <div className={styles.info}>
                <div className={styles.name}>{name}</div>
                <div className={styles.bio}>{bio}</div>
                <div className={styles.projects}>My projects</div>
                <div>
                  {Object.keys(works).map(keyUrl => (
                    <a
                      href={works[keyUrl]}
                      key={keyUrl}
                      className={styles.project}>{keyUrl}</a>
                  ))}
                </div>
              </div>
              <div className={styles.social}>
                <div className={styles.mail}>angelshakirova@gmail.com</div>
                <button className={styles.btn} onClick={() => {
                  window.open(profile, '_blank');
                }}>
                  <GitHub/>
                </button>
                <button className={styles.btn} onClick={() => {
                  window.open('https://t.me/Angelina_Ptrv', '_blank');
                }}>
                  <Telegram/>
                </button>
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