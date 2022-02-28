import RobotInfoPoseImage from '../../../assets/robot/8.png';
import RobotWarningPoseImage from '../../../assets/robot/4.png';
import RobotErrorPoseImage from '../../../assets/robot/6.png';
import RobotSuccessPoseImage from '../../../assets/robot/7.png';

const modalTypes = {
  info: {
    // title: 'Hmmm...',
    imageUrl: RobotInfoPoseImage,
  },
  warning: {
    // title: 'Warning',
    imageUrl: RobotWarningPoseImage,
  },
  error: {
    // title: 'Error',
    imageUrl: RobotErrorPoseImage,
  },
  success: {
    // title: 'Success',
    imageUrl: RobotSuccessPoseImage,
  },
};

export default modalTypes;