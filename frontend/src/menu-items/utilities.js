// assets
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  SelfImprovementIcon,
  QuestionAnswerIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-ChatBot',
      title: 'ChatBot',
      type: 'item',
      url: '/chat',
      icon: icons.QuestionAnswerIcon
    },
    {
      id: 'util-Meditate',
      title: 'Meditate',
      type: 'item',
      url: '/meditate',
      icon: icons.SelfImprovementIcon
    },
    
  ]
};

export default utilities;
