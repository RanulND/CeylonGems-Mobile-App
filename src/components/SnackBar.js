import React from 'react';
import { Snackbar } from 'react-native-paper';

const SnackBar = ({snackbarVisible, setSnackbarVisible, displayMsg, barColor}) => {
  const onDismissSnackBar = () => setSnackbarVisible(false);
  return (
    <Snackbar
      visible={snackbarVisible}
      onDismiss={onDismissSnackBar}
      style={{backgroundColor: barColor, opacity: 0.7}}
    >
      {displayMsg}
    </Snackbar>
  );
};

export default SnackBar;
