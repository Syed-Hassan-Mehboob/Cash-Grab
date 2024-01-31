import Constants from '../common/Constants';
import utils from '../utils';
import Axios from '../network/APIKit';

export function getCardDetails(token, setcardDetails) {
  const onSuccess = ({data}) => {
    // this.toggleIsLoading();
    console.log('DATE', data?.data);
    setcardDetails(data?.data);
  };

  const onFailure = (error) => {
    utils.showResponseError(error);
    console.log(error);
  };

  Axios.get(Constants.getCard, {
    headers: {
      Authorization: token,
    },
  })
    .then(onSuccess)
    .catch(onFailure);
}
