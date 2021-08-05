import Head from 'next/head'
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import * as Realm from 'realm-web';
import styles from '../styles/Home.module.css'
import Modal from '../components/modal';

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const REALM_APP_ID = 'application-1-mcmwq';
  const app = new Realm.App({id: REALM_APP_ID});
  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: ''
  });

  function redirectTo(sUrl) {
    window.location = sUrl
  }


  const changeValue = (e) => {
    setState(state => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  }

  const register = async (e) => {
    e.preventDefault();
    if (!state.email || !state.password) {
      return
    }
    try {
      await app.emailPasswordAuth.registerUser(state.email, state.password)
      router.reload();
    } catch (err) {
      setShowModal(true);
      setMessage(err.error.replace(/\b\w/g, l => l.toUpperCase()))
    }
  }

  const login = async (e) => {
    e.preventDefault();
    const credentials = Realm.Credentials.emailPassword(state.email, state.password);
    try {
      const user = await app.logIn(credentials);
      router.reload();
    } catch (err) {
      setShowModal(true);
      setMessage('Incorrect Login Information')
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Minority Programmers</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <div
        className="p-20 h-screen w-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600">
        <div className="content text-3xl text-center md:text-left">
        </div>

        <img
          alt='MP'
          width="500"
          height="300"
          src='https://minorityprogrammers.com/assets/images/mp_asset_icon.svg'
        />

        <div className="container mx-auto flex flex-col items-center">
          <form className="shadow-2xl w-96 p-16 flex flex-col bg-yellow-500 rounded-tl-lg"
                onSubmit={register}>
            <p className="text-5xl pb-8 text-white text-left font-medium">
              Welcome!
            </p>
            <input
              name="username"
              type="text"
              placeholder="🙈 Your name"
              className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
              onChange={changeValue}
            />

            <input
              name="email"
              onChange={changeValue}
              type="text"
              placeholder="👤 Your e-mail"
              className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            />
            <input
              name="password"
              onChange={changeValue}
              type="password"
              placeholder="👀 Password"
              className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"

            />


            <button
              type={"button"}
              href="https://simple-form-ronlagss.vercel.app/extra_info"
              className="w-full bg-pink-600 text-white p-3 rounded-lg font-semibold text-lg"
              onClick={register}
            >
              Create Account
            </button>


            <button
              onClick={login}
              type={"button"}
              className="w-full bg-blue-700 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">Sign
              in
            </button>


          </form>
          <p className="text-center text-sm my-4">
            <span className="font-semibold text-white text-center w-full"> Diverse, Multidisciplinary, Socially Impactful Network </span>
          </p>
        </div>

      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        {message}
      </Modal>

    </div>

  )
}
