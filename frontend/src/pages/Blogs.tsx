import React, { useEffect, useState } from 'react'
import BlogCard from '../components/BlogCard'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Spinners from "react-loader-spinner";

interface BackendPostResponse {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  userId: string;
  User: {
    username: string;
  };
}

function Blogs() {
  const [posts,setPosts]=useState<BackendPostResponse[]>([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState<string>("");
  const navigate=useNavigate();

  useEffect(()=>{

         const fetchSessionAndPosts = async () => {
      try {
        // Check if the user is authenticated
        const token =localStorage.getItem("token");
        // navigate("/blogs");
        if ( !token) {
          navigate("/signup");
          return;
        }

        const response=await axios.get("https://backend.jeevika-sirwani2003.workers.dev/api/v1/blog/allPosts",{
          headers:{
            Authorization:`Bearer ${token}`,
          }
        });
          const result=await response.data;
          if (!result.success) {
          throw new Error(result.error || "Failed to fetch posts");
        }

        const formattedPosts: BackendPostResponse[] = result.data.map((post:BackendPostResponse) => ({
          id: post.id,
          title: post.title,
          description: post.description,
          createdAt: post.createdAt,
          username: post.User?.username || "Unknown",
          userId: post.userId,
          User: {
            username: post.User?.username || "Unknown",
          },
        }));

        setPosts(formattedPosts);
      }catch (error) {
        console.error("Error fetching session or posts:", error);
        navigate("/signup");
      }
    }
    fetchSessionAndPosts();
  },[navigate]);
if(loading){
  return(
    <div className='flex justify-center items-center h-screen w-screen'>
      <Spinners.Oval
      visible={true}
      height={50}
      width={50}
      color="#000000"
          secondaryColor="#000000"
          strokeWidth={3}
          strokeWidthSecondary={4}
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""/>
    </div>
  )
}
if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <div className="text-red-600 text-lg">{error}</div>
      </div>
    );
  }
  return (
    // <div><BlogCard authorname='jeevika' title='title' description='descript' publishedDate='rn'/>
    // <BlogCard authorname='jeevika' title='title' description='descript' publishedDate='rn'/>
    // <BlogCard authorname='jeevika' title='title' description='descript' publishedDate='rn'/></div>
    <div className='flex flex-col min-h-screen bg-white'>
      <div className='flex-grow p-4 sm:p-6 md:p-8 max-w-4xl mx-auto w-full'>
        <div>
          {posts.slice().reverse().map((post)=>(
           <BlogCard key={post.id}
                authorname={post.User?.username }
                publishedDate={post.createdAt}
                title={post.title}
                description={post.description}/>

          ))}
        </div>
      </div>
    </div>
  )
}

export default Blogs

