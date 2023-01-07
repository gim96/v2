import { useEffect, useState } from "react"
import axios from 'axios'
import moment from 'moment'

function App() {

  const [comments, setComments] = useState([])
  const [comment, setcomment] = useState('')

  function getData() {
    axios.get(`http://localhost:3000/comments`)
    .then((resp) => {
       const data = resp.data
       setComments(data)
      //  console.log(data)
        
    })  
    .catch((err) => {
        console.log(err)
    })

  }

  useEffect(() => {
    getData()
  }, [])


  const handleSave = () => {
    const name = 'Harry Potter'
    const date = (new Date()).toISOString()
    console.log(date)
    if (comment !== '') {

      const data = {
        name:name,
        comment:comment,
        date:date
      }

      axios.post(`http://localhost:3000/comments`, data)
      .then((resp) => {
        getData()
      })  
      .catch((err) => {
          console.log(err)
      })
    } else {
      alert('required field.!')
    }
   
  }

  return (
    <div>
       <div class="p-5">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h4><b>Discussion</b></h4>
                </div>
            </div>
            

            <div class="row pt-4">
                <div class="col-md-12">
                        <img src='https://img.icons8.com/external-anggara-flat-anggara-putra/32/null/external-avatar-user-interface-anggara-flat-anggara-putra.png' alt='img' />
                        &nbsp; <input type="text" onChange={(e) => setcomment(e.target.value)} style={{borderRadius: '5px',borderColor:'aqua'}}  />
                        <button class="btn btn-primary btn-sm" id="'btn" onClick={handleSave}>Comment</button>
                </div>
            
            </div>
            <br />
            <hr />
            <br />
            {
                comments && comments.map((data) => (
                  <div>
                  <div class="row pt-4">
                      <div class="col-md-12">
                         <img src='https://img.icons8.com/external-anggara-flat-anggara-putra/32/null/external-avatar-user-interface-anggara-flat-anggara-putra.png' class="avatar" alt='ll' />
                        &nbsp; {data.name} . {moment(new Date(data.date)).startOf('hour').fromNow()}
                      </div>
                      
                  </div>
                  <div class="pl-5" style={{paddingLeft: '40px'}}>
                      <div class="row">
                          <div class="col-md-12">
                              {data.comment}
                          </div>
                      </div>
                      <div class="row">
                          <div class="col-md-12">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up-fill" viewBox="0 0 16 16">
                                  <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                              </svg>
                              <button class="btn btn-white">Upvote</button>
                              <button class="btn btn-white">Reply</button>
                          </div>
                      </div>
                  </div>
                  </div>
                ))
            }
           
            
           
        </div>
    </div>
    </div>
  );
}

export default App;
