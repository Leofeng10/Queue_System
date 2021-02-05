import {env} from '../config/env/index'

export default (value) => {
    let url = env().server + '/' + value
    return url
}