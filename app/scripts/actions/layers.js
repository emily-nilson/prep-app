import 'whatwg-fetch';
import {
  LAYER_DATA_RECEIVED,
  LAYER_DATA_ERROR
} from '../constants';
import { updateURL } from './links';

export default function () {}

export function getLayerById(layerId) {
  return (dispatch) => {
    fetch(`${config.apiUrlRW}/layer/${layerId}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
      })
      .then((data) => {
        dispatch({
          type: LAYER_DATA_RECEIVED,
          payload: data
        });
      })
      .catch((err) => {
        dispatch({
          type: LAYER_DATA_ERROR,
          payload: {
            id: layerId,
            error: err.message
          }
        });
        dispatch(updateURL());
      });
  };
}
