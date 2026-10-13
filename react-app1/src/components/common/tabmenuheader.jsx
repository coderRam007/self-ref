import './tabmenuheader.css'
import { TabMenu } from 'primereact/tabmenu';
import { TieredMenu } from 'primereact/tieredmenu';
import { useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {Avatar} from 'primereact/avatar';
import { Menu } from 'primereact/menu';
export default function Header() {
  const location = useLocation();
  const menu = useRef(null);
  const avatarMenu=useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate=useNavigate();
  const items=[
    { label: 'Images',command:()=>{navigate('/images')}},
    { label: 'Pdf', command:()=>{navigate('/pdfs')}},
    { label: 'Profile', command:()=>{navigate('/profiles')} },
    { label: 'Genre',command:()=>{navigate('/genre')} },
    { label: 'Upload'}];
  const tier2= [
      {
        label: 'Image',command:()=>{navigate('/upload/image')}
       
      },
      {
        label: 'Pdf',command:()=>{navigate('/upload/pdf')}
      },
      {
        label: 'Genres',
        items: [
          { label: 'Action',command:()=>{navigate('/upload/genre/action')}  },
          {
          label: 'Comedy',command:()=>{navigate('/upload/genre/comedy')}
          },
          {
            label: 'Romance',command:()=>{navigate('/upload/genre/romance')}
          },
          {
            label: 'Sci-Fi',command:()=>{navigate('/upload/genre/scifi')}
          },
          {
            label: 'Horror',command:()=>{navigate('/upload/genre/horror')}
          },
        ],
      },
    ];
  const avatarItems=[
    {
      label:'View',
      command:()=>{
        navigate('/viewprofile');
      }
    },
    {
      label:'SignOut',
      command:()=>{
        localStorage.removeItem('userName');
        navigate('/login');
      }
    }
  ];
  const [path,setPath]=useState('');
  useEffect(()=>{
      fetch("http://localhost:5125/getProfileData")
      .then((response) => response.json())
      .then((data) => {
        var modifiedData = data.map((item) => ({
          ...item,
        }));
        setPath('data:image/jpg;base64,'+modifiedData.filter((item)=>(!item.userName.localeCompare(localStorage.getItem('userName'))))[0].profileImage);
      })
      .catch((error) => console.error("Error:", error));
      
  },[]);
  useEffect(() => {
    switch (location.pathname) {
      case '/images':
        setActiveIndex(0);
        break;
      case '/pdfs':
        setActiveIndex(1);
        break;
      case '/profileDetails':
        setActiveIndex(2);
        break;
      case '/profiles':
        setActiveIndex(2);
        break;
      case '/genre':
        setActiveIndex(3);
        break;
      case '/genre/horror':
        setActiveIndex(3);
        break;
      case '/upload':
        setActiveIndex(4);
        break;
      case '/upload/image':
        setActiveIndex(4);
        break;
      case '/upload/pdf':
        setActiveIndex(4);
        break;
      case '/upload/genre/action':
        setActiveIndex(4);
        break;
      case '/upload/genre/horror':
        setActiveIndex(4);
        break;
      case '/upload/genre/romantic':
        setActiveIndex(4);
        break;
      case '/upload/genre/comedy':
        setActiveIndex(4);
        break;
      case '/upload/genre/scifi':
        setActiveIndex(4);
        break;
      default:
        setActiveIndex(0);
        break;
    }
  }, [location]);
  const handleUpload=(e)=>{
    setActiveIndex(e.index);
    if(e.index===4)
    menu.current.toggle(e.originalEvent);
  }
  if(path==null)
    return(<div></div>);
  return (
    <>
    <Menu model={avatarItems} popup ref={avatarMenu}/>
    <TieredMenu model={tier2} popup  ref={menu} breakpoint="767px" />
    <div  style={{display:'flex',flexDirection:'left'}} >
    <h1 class="main-header">Image&nbsp;Viewer &nbsp;&nbsp;</h1>
    <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => handleUpload(e)} style={{marginTop:'15px',backgroundColor:'black',color:'white'}}/>
    <div class='avatar-img' >
      <Avatar image={path?path:require('../../default.jpeg')} size="xlarge" shape="circle" onClick={ (e)=>avatarMenu.current.toggle(e)}/>
    </div>
    </div>
    </>
  );
}

