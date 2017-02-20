import axios from 'axios';
import { map, sortBy, assign }from 'lodash';
import moment from 'moment';

//Creating actions consts
export const PRE_FETCH_REPOSITORIES = "PRE_FETCH_REPOSITORIES";
export const FETCH_REPOSITORIES = "FETCH_REPOSITORIES";


function reconstructRepo({data}) {
	const repoData = map(data,(obj) => {
		return {
			repoName: obj.name,
			contributorsUrl: obj.contributors_url,
			stars: obj.stargazers_count,
			watchers: obj.watchers_count,
			forks: obj.forks_count,
			lastUpdate: moment(obj.updated_at).startOf('day').fromNow(),
			score: obj.forks + 2 * obj.stargazers_count + obj.watchers
		}
	});

	//sort by score (asc order)
	const sortedrepoData = sortBy(repoData, r => -r.score);

	return sortedrepoData;
}

//Fetching contributers repositories (github)
function fetchContributersInfo(repos) {
	let promises = map(repos, repo => axios.get(repo.contributorsUrl));

	return Promise.all(promises).then( data => {
		return map(repos, (repo, index) => {
			let contributors = data[index].data;

			return assign({}, repo, {
				contributors: contributors
			})
		});
	});
}

//Fetching user's github repositories
export function fetchRepositories(name) {
	const url     = `https://api.github.com/users/${name}/repos`;
	const request = axios.get(url);

	return (dispatch) => {
		dispatch(preFetchRepositories());
		return request
				.then(reconstructRepo)
				.then(fetchContributersInfo)
				.then((data) => {
					dispatch({ type: FETCH_REPOSITORIES, name: name , payload: data, isError: false })
				})
				.catch((e) => {
					dispatch({ type: FETCH_REPOSITORIES, name: name, isError: true })
				});
	}
}

//Action for "pending" state - (show spinner & Loading...) .
export function preFetchRepositories() {
	return {
		type: PRE_FETCH_REPOSITORIES,
		isPending: true
	};
}







