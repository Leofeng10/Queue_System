import {appEnv} from '../env/index'

export default (value) => {
    let url = appEnv().server + '/' + value
    return url
}