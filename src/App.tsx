import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { TabBar } from './components/TabBar'
import { BackToTop } from './components/BackToTop'
import { ScrollToTop } from './components/ScrollToTop'
import { BooksPage } from './pages/BooksPage'
import { BookPage } from './pages/BookPage'
import { PeoplePage } from './pages/PeoplePage'
import { PersonPage } from './pages/PersonPage'
import { PlacesPage } from './pages/PlacesPage'
import { PlacePage } from './pages/PlacePage'
import { StorylinePage } from './pages/StorylinePage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 pb-24 sm:px-6 sm:pb-6">
        <Outlet />
      </main>
      <Footer />
      <TabBar />
      <BackToTop />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<BooksPage />} />
          <Route path="book/:slug" element={<BookPage />} />
          <Route path="people" element={<PeoplePage />} />
          <Route path="people/:slug" element={<PersonPage />} />
          <Route path="places" element={<PlacesPage />} />
          <Route path="places/:slug" element={<PlacePage />} />
          <Route path="storyline" element={<StorylinePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
