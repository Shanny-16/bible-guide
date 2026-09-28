import { useEffect } from 'react'
import { resetAllProgress, useVersion } from '../lib/storage'
import { ExternalLink } from '../components/ExternalLink'
import { VersionPicker } from '../components/VersionPicker'

export function AboutPage() {
  const { version, setVersion } = useVersion()

  useEffect(() => {
    document.title = 'About · Bible Study Guide'
  }, [])

  function handleReset() {
    const confirmed = window.confirm('Reset your read-progress and all saved notes on this device? This cannot be undone.')
    if (confirmed) {
      resetAllProgress()
      window.location.reload()
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <section className="flex flex-col gap-2">
        <h1 className="font-heading text-2xl font-semibold text-ink">About this guide</h1>
        <p className="text-[15px] text-ink">
          This is our small group's printed "Pastel Bible Guide," moved online. It's the same table of all 66
          books — date, authorship, a study snapshot and key passages — plus the storyline and timeline from the
          back page, now searchable and easy to check on a phone. No login, no account, nothing shared: your
          reading progress and notes stay on your own device.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-semibold text-ink">How to read the dates and authorship lines</h2>
        <dl className="flex flex-col gap-3 rounded-card border border-ink/10 bg-white p-4">
          <div>
            <dt className="font-semibold text-ink">"Trad."</dt>
            <dd className="text-[15px] text-muted">Short for traditional attribution — what the church has historically believed about who wrote a book.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">"debated"</dt>
            <dd className="text-[15px] text-muted">Scholars disagree on the date or author; this guide notes the disagreement rather than picking a side.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">"c."</dt>
            <dd className="text-[15px] text-muted">Short for circa — approximately.</dd>
          </div>
        </dl>
        <p className="text-sm text-muted">
          Throughout, this guide summarizes both traditional and scholarly views side by side, without taking sides.
        </p>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-semibold text-ink">Bible version</h2>
        <p className="text-sm text-muted">Used for every "Read on Bible Gateway" link and passage chip. Saved on this device.</p>
        <div className="max-w-xs">
          <VersionPicker value={version} onChange={setVersion} id="about-version" />
        </div>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="font-heading text-xl font-semibold text-ink">Sources</h2>
        <ul className="flex flex-col gap-1.5 text-[15px]">
          <li>
            <ExternalLink href="https://www.biblegateway.com">Bible Gateway</ExternalLink> — full Bible text in many versions.
          </li>
          <li>
            <ExternalLink href="https://bibleproject.com">BibleProject</ExternalLink> — short overview videos for every book.
          </li>
          <li>
            <ExternalLink href="https://enduringword.com">Enduring Word</ExternalLink> — chapter-by-chapter commentary by David Guzik.
          </li>
        </ul>
        <p className="text-sm text-muted">
          Verse text in the pop-up comes from <ExternalLink href="https://bible-api.com">bible-api.com</ExternalLink> (World English
          Bible and King James Version, both public domain). For NIV and other modern versions, use the Bible Gateway link.
        </p>
      </section>

      <section className="flex flex-col gap-2 rounded-card border border-history-deep/25 bg-history-soft/40 p-4">
        <h2 className="font-heading text-lg font-semibold text-history-deep">Reset my progress and notes</h2>
        <p className="text-sm text-ink">Clears which books you've marked as read and every note you've saved, on this device only.</p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-1 inline-flex min-h-[44px] w-fit items-center rounded-full border border-history-deep/40 bg-white px-4 text-sm font-semibold text-history-deep hover:bg-history-soft"
        >
          Reset my progress and notes
        </button>
      </section>
    </div>
  )
}
