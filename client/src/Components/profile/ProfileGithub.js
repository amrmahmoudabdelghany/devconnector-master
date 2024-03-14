import React, { useEffect } from 'react'
import useAccActions from '../../hooks/useAccActions';
import { useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({username}) => { 

    const {fetchGithubRepos} = useAccActions() ;
   // const username = useSelector(state=>state.profile.profile.githubusername) ; 
    useEffect(()=>{  
        fetchGithubRepos(username) ; 
    } , []) ;  
    const repos = useSelector(state=>state.profile.repos) ;


  return <div className ="profile-github"> 
    <h2 className="text-primary my-1">Github Repos</h2>
     {repos === null ? <Spinner/> : 
     (
        repos.map((repo)=>(
            <div key = {repo.id} className = "repo bg-white p-1 my-1"> 
                 <div> 
                        <h4>
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                {repo.name}
                            </a>
                        </h4>
                    <p>{repo.description}</p>
                 </div> 
                 <div> 
                  <ul> 
                    <li className="badge badge-primary">
                        Starts : {repo.startgazers_count || 0}
                    </li>
                  
                    <li className="badge badge-dark">
                        Watchers : {repo.watchers}
                    </li>
                    <li className="badge badge-light">
                        Forks : {repo.forks}
                    </li>
                  </ul>
                </div>
             </div> 
        ))
     )}
  
  </div>
}

export default ProfileGithub
