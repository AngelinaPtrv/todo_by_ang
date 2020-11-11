import React, {Component} from "react";

import CircularProgress from '@material-ui/core/CircularProgress';
import styles from "./About.module.css";

const name = 'ljhjklkjg';
const URL = 'https://api.github.com/users/' + name;

export default class About extends Component {
  state = {
    name: '',
    bio: '',
    email: '',
    isLoading: true,
    repoUrl: '',
    repoList: [],
    fetchRequest: false,
    loadFailure: false
  }

  componentDidMount() {
    let func = async () => {
      await fetch(URL)
      .then(resolve => resolve.ok
      ? resolve.json()
      : Promise.reject())
      .then((json) => {
        this.setState({
          name: json.name,
          bio: json.bio,
          email: json.email,
          repoUrl: json.repos_url,
          fetchRequest: true
        })
    });

      await fetch(this.state.repoUrl)
      .then(resolve => resolve.json())
      .then((json) => {
        let arrName = json.map(elem => elem.name);
        this.setState({
          repoList: arrName,
          isLoading: false
        })
      }).catch(() => {
          console.log(this.state.isLoading);
          this.setState({
            loadFailure: true,
            isLoading: false})
      });
      };
  }

  render() {
    const link = `https://github.com/`;
    const {isLoading, repoList, name, bio, email, fetchRequest, loadFailure} = this.state;
    return (
      <div className={styles.wrap}>
        <h1 className={styles.title}>{isLoading ? <CircularProgress /> : 'About me'}</h1>
        <div>
          {fetchRequest ?
            <ul>
              {name && <li>{name}</li>}
              {bio && <li>{bio}</li>}
              {email && <li>{email}</li>}
            </ul> :
            'User not found'}
        </div>
        {(!isLoading && !loadFailure)
          ? <div>
              <h1 className={styles.title}>My repos</h1>
                <ol>
                  {repoList.map((repo, index) => (
                  <li key={index}>
                    <a href={`${link}${name}/${repo}`} className={styles.link}>{repo}</a>
                  </li>
                  ))}
                </ol>
            </div>
          : <div>Repos no found</div>
        }
      </div>
    )
  }
}
