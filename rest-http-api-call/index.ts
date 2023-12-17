
interface User {
  name: string
  age: string
}

function getUsers(): Promise<User[]> {

  const headers: Headers = new Headers()
 
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  
  headers.set('X-Custom-Header', 'CustomValue')


  const request: RequestInfo = new Request('./users.json', {
    method: 'GET',
    headers: headers
  })

  
  return fetch(request)

    .then(res => res.json())
    .then(res => {
    
      return res as User[]
    })
}

const result = document.getElementById('result')
if (!result) {
  throw new Error('No element with ID `result`')
}

getUsers()
  .then(users => {
    result.innerHTML = users.map(u => u.name).toString()
  })


function createUser(user: User): Promise<void> {

  const headers: Headers = new Headers()
  headers.set('Content-Type', 'application/json')

  headers.set('Accept', 'application/json')

  const body: BodyInit = JSON.stringify(user)
  const request: RequestInfo = new Request('/users', {
    
    method: 'POST',
    headers: headers,
  
    body: body
  })

 
  return fetch(request)
    .then(res => {
      console.log("got response:", res)
    })
}

createUser({ name: 'New User', age: '30' })
  .then(() => {
    console.log("User created!")
  })