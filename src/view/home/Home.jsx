import React from 'react'
import Sidebar from '../../components/common/SideBar'
import SearchBar from '../../components/common/SearchBar'

const Home = () => {
    return (
        <>
            <main className='d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row'>
                <Sidebar />
                <section className='main-content p-4'>
                    <SearchBar />
                </section>
            </main>
        </>
    )
}

export default Home
