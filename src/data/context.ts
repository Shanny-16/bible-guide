// "The context": one paragraph per book on the world behind it — when it was written, who first
// heard it, and what was going on for them. Where dates or authorship are debated, the wording stays
// neutral, matching the "Trad." / "debated" approach of the printed guide.
// First draft 2026-09-28; Sharon can edit freely. Keyed by book slug.

export const CONTEXT: Record<string, string> = {
  genesis:
    "Genesis was first read by Israel as a people who already knew the exodus. Its stories of creation, the flood and the patriarchs answered their questions: who is our God, why does the world look the way it does, and why are we heading for this land? Its creation account also spoke into a world of Babylonian and Canaanite myths, insisting on one good Creator rather than warring gods. Read it as the family history of a nation that needed to know its promises were older than its problems.",
  exodus:
    "Set in Egypt and the Sinai wilderness, Exodus was written for a people who defined themselves by this rescue; every Passover retold it. Its first hearers knew slavery, then wandering, and needed to know that the LORD is stronger than any empire and had bound himself to them by covenant. The long tabernacle chapters answered a practical question for a camp of former slaves: how does a holy God live among ordinary people?",
  leviticus:
    "Leviticus assumes the tabernacle has just been built (Exodus 40) and answers the next question: now that God is in the middle of the camp, how do we approach him safely? The audience was a priest-led nation surrounded by Canaanite religion, so the laws on sacrifice, food, disease and sex marked Israel out as belonging to a different God. Ordinary Israelites experienced most of it as the rhythm of festivals and offerings.",
  numbers:
    "Numbers covers about 38 years between Sinai and the plains of Moab. The first generation rescued from Egypt refuses to enter the land and dies in the wilderness; the book ends with their children being counted, ready to try again. Its first readers were that second generation and their descendants, and the message was pointed: unbelief cost your parents the land, and God is still faithful to the promise.",
  deuteronomy:
    "Deuteronomy is set on the plains of Moab in the last weeks of Moses' life, addressed to the children of the exodus generation, who had never seen Egypt. It re-preaches the covenant for people about to become farmers and landowners with kings and neighbors, warning that prosperity and Canaanite worship would be the real dangers. Later Israel read it as the yardstick for judging its kings, and Jesus quoted it constantly.",
  joshua:
    "Joshua describes the entry into Canaan in the late second millennium BC, but its written form served later Israel, probably in the time of the kings or the exile, asking why they had the land and on what terms. The conquest stories show that God kept his word and that the land was a gift held by covenant, not by strength. The hard passages read differently once you notice Rahab and the Gibeonites: outsiders who trust the LORD are taken in.",
  judges:
    "Judges spans the two centuries or so between Joshua and the first kings, when Israel was a loose collection of tribes with no central leader. It was shaped by later writers who had seen the monarchy, which is why it keeps repeating \"in those days Israel had no king\". The original audience heard it as an explanation of their own history: without faithful leadership and covenant loyalty, the nation spiraled into chaos.",
  ruth:
    "Ruth is set in the same violent era as Judges but in a village, with a famine, a funeral and a barley harvest. It was written after David became king, likely to explain his surprising family tree, and possibly to speak into later debates about foreign wives (compare Ezra 9-10). Its first audience lived in a world where a childless widow had no safety net; kinsman-redeemer laws and gleaning rights were the welfare system.",
  '1-samuel':
    "1 Samuel covers Israel's shift from tribal chaos to monarchy around 1050-1010 BC, when the Philistines with their iron weapons were the pressing threat. Israel asks for a king \"like all the other nations\", and the book is honest about the mixed motives on all sides. Its readers, living under later kings, were being taught what kind of king God wants: not the tall impressive one but the man after God's own heart.",
  '2-samuel':
    "2 Samuel covers David's forty-year reign (c. 1010-970 BC): the uniting of the tribes, the capture of Jerusalem, and the covenant promising his line a permanent throne. Its readers lived under David's descendants, and the book explains both why the promise mattered and why the kingdom suffered so much: David's private sin had public consequences. It was written by people who loved David and still told the truth about him.",
  '1-kings':
    "1 Kings runs from Solomon's coronation (c. 970 BC) through the kingdom's split (c. 930) to Elijah's ministry in the north (c. 860s). The temple made Jerusalem the center of worship, so the northern kings built rival shrines, and the book judges every ruler by that choice. The final form was compiled during or after the exile, for readers asking how a nation with such a glorious start ended up in Babylon.",
  '2-kings':
    "2 Kings covers about 300 years, from Elisha (c. 850 BC) to the fall of Samaria to Assyria (722) and of Jerusalem to Babylon (586). It was finished in exile and ends with a small hopeful note: King Jehoiachin released from prison. Its readers had lost land, temple and king, and needed to hear that this was not because God was weak but because the warnings of Deuteronomy had come true, and that his promise to David still stood.",
  '1-chronicles':
    "Chronicles was written for the small community that returned from Babylon in the 5th or 4th century BC, living under Persian rule with a modest rebuilt temple and no king. It retells Israel's history from Adam to the return, skipping most of David's failures and highlighting the temple, the priests and the musicians. The point was identity: you are the true continuation of Israel, and worship at this temple is your inheritance.",
  '2-chronicles':
    "2 Chronicles follows the kings of Judah alone, ignoring the northern kingdom, because its post-exile readers were the heirs of Judah and the temple. Kings who sought the LORD prosper, and reformers like Hezekiah and Josiah get long treatments. The message for a discouraged community was that repentance had always brought restoration, and Cyrus's decree at the end was proof that God had not finished with them.",
  ezra:
    "Ezra begins in 538 BC with Cyrus's decree and follows two returns: Zerubbabel's temple builders and, some sixty years later, Ezra's reformers. Judah was now a tiny Persian province called Yehud, surrounded by suspicious neighbors, and intermarriage threatened to dissolve the community into the surrounding peoples. The book's severity about foreign wives reads as a survival measure for a people who had almost disappeared once.",
  nehemiah:
    "Nehemiah arrives in 445 BC, about ninety years after the first return, to find Jerusalem's walls still in ruins and the community demoralized. Persia allowed some local autonomy, but neighboring governors like Sanballat saw a fortified Jerusalem as a threat. The book shows a lay leader combining prayer with planning, and the covenant renewal of chapters 8-10 shows what rebuilding a people, not just a wall, looked like.",
  esther:
    "Esther is set in the Persian capital Susa under Xerxes I (486-465 BC), among Jews who had chosen not to return to Judah. They were a scattered minority in a vast empire, vulnerable to a single official's grudge. The book was written for Jews of the diaspora to explain the festival of Purim and to reassure them that God's care reaches into pagan palaces even when his name is never spoken.",
  job:
    "Job is set outside Israel, in the land of Uz, among patriarch-era figures, but its poetry may come from a much later time. Its first readers lived in a world where the standard wisdom, shared with Egypt and Mesopotamia, said the righteous prosper and the wicked suffer. The book puts that neat formula on trial and gives suffering believers permission to argue with God rather than lie about their pain.",
  psalms:
    "The Psalms were composed across roughly five centuries and collected for temple worship, then for synagogues after the exile. Many were sung by pilgrims, choirs and kings; the titles mention tunes, instruments and occasions. Their first users were a people who prayed together, so \"I\" often means \"we\", and the raw laments and cries for justice made sense to a nation that had known invasion, exile and betrayal.",
  proverbs:
    "Proverbs comes from the royal court and wisdom circles of Jerusalem, where young men were trained for public life. Its setting is a farming and trading society where a fool could ruin a family and a lazy son could lose the land. It shares the form of Egyptian wisdom writing but insists that wisdom starts with fearing the LORD; the collections grew from Solomon's day through Hezekiah's scribes (25:1).",
  ecclesiastes:
    "Ecclesiastes speaks in the voice of a king in Jerusalem, though its language suggests it reached final form after the exile, when Judah lived under empires and the old promises seemed distant. Its readers were people asking whether work, wealth and wisdom added up to anything. The book gives honest words for that frustration and then points, briefly but firmly, to fearing God as the thing that lasts.",
  'song-of-songs':
    "The Song comes from ancient Israel's world of vineyards, shepherds and arranged marriages, where love poetry was also a wedding art. It was accepted into Scripture and read at Passover, with Jewish teachers hearing in it God's love for Israel and Christians hearing Christ and the church. Its first hearers would have recognized the freedom and mutual desire of the two lovers as something worth celebrating and guarding.",
  isaiah:
    "Isaiah began preaching in Jerusalem around 740 BC as Assyria rose to dominate the region; he lived through the fall of the northern kingdom and Sennacherib's siege of Jerusalem in 701. Chapters 40-66 speak to Judah's exiles in Babylon and their return, which is why scholars debate the book's composition. Its audience was a small kingdom tempted to trust alliances with Egypt or Assyria rather than the Holy One of Israel.",
  jeremiah:
    "Jeremiah preached in Jerusalem from about 627 BC, through Josiah's reform, Babylon's rise, and the city's destruction in 586. His audience insisted the temple made Jerusalem untouchable; his message that God would use Babylon to judge his own people made him a traitor in their eyes. His letter to the first exiles told them to settle in, pray for the city, and wait seventy years.",
  lamentations:
    "Lamentations was written in the smoking aftermath of 586 BC by someone who had watched Jerusalem starve and burn. Its first readers were the survivors, in the ruins or in exile, who needed a way to grieve that was honest and still faithful. Jews still read it aloud on the fast day that remembers the temple's destruction.",
  ezekiel:
    "Ezekiel was deported to Babylon with the first wave of exiles in 597 BC and prophesied there from 593, while Jerusalem still stood. His audience was a community of displaced people who assumed God lived in the temple back home, then had to absorb the news that the city had fallen. The book's strange visions of a mobile throne and a rebuilt temple answered their deepest question: has God left us?",
  daniel:
    "Daniel's stories are set in Babylon and Persia from 605 BC onward, among young exiles serving in the courts of the very empire that destroyed Jerusalem. The visions address the pressures faced by Jews under later empires, especially the Greek persecution of the 160s BC, which is why the book's date is debated. Either way, its audience was believers living under hostile powers, needing to know which kingdom lasts.",
  hosea:
    "Hosea prophesied in the northern kingdom in its last decades (c. 755-715 BC), a time of prosperity, political assassinations and Baal worship. Israel treated the LORD as one god among several and trusted alliances with Assyria and Egypt. Hosea's own broken marriage became the sermon: the people were the unfaithful wife, and God was the husband who would judge and then win her back.",
  joel:
    "Joel's date is uncertain, but his setting is clear: a locust plague so severe that it stopped the temple offerings, read as a warning of a greater day of the LORD. His audience in Judah gathered at the temple to fast and pray. The promise that the Spirit would be poured out on all people was given to a community that had just felt how fragile its life was.",
  amos:
    "Amos was a southerner sent north to Israel around 760 BC, at the height of its wealth under Jeroboam II. The rich had winter and summer houses, the poor were sold for a pair of sandals, and the worship at Bethel was lavish and empty. His audience felt secure and religious; he told them the day of the LORD would be darkness for them, and that Assyria was coming.",
  obadiah:
    "Obadiah speaks after the fall of Jerusalem in 586 BC, when Edom, the brother nation descended from Esau, looted the city and handed over refugees. Its audience was the shattered people of Judah, asking whether such betrayal would go unanswered. The book's twenty-one verses assure them that the day of the LORD applies to the nations too.",
  jonah:
    "Jonah was a real prophet under Jeroboam II (2 Kings 14:25), and Nineveh was the capital of Assyria, the empire that would later destroy northern Israel. The book was written for Israelites who knew exactly why Jonah did not want Nineveh spared. Its closing question was aimed at them: can you accept a God who has compassion on your enemies?",
  micah:
    "Micah preached in Judah from a small town during the same crisis as Isaiah (c. 735-700 BC), when Assyria was swallowing the region. His audience included land-grabbing elites in Jerusalem and the country people they exploited. He warned that Jerusalem would become a heap of rubble, a prophecy remembered a century later in Jeremiah's trial (Jeremiah 26:18), and he promised a ruler from little Bethlehem.",
  nahum:
    "Nahum wrote sometime between 663 BC, when he could cite the fall of Thebes, and 612, when Nineveh fell. Assyria had terrorized the Near East for a century with deportations and cruelty. His audience in Judah had lived under that shadow, and the book gave them words for the relief of seeing a brutal empire finally judged.",
  habakkuk:
    "Habakkuk prophesied as Babylon replaced Assyria as the superpower (c. 609-597 BC) and Judah's last kings slid into injustice. His audience was faithful people confused by God's silence about corruption at home and horrified that a worse nation would be the instrument of judgment. The book models taking those complaints straight to God and waiting for an answer.",
  zephaniah:
    "Zephaniah preached in Jerusalem during the reign of young Josiah (640-609 BC), before or during his reforms, when decades of idolatry under Manasseh had left the city full of Baal worship and complacency. His audience assumed the LORD would do nothing, good or bad. The book announces a sweeping day of the LORD and then promises joy for the humble remnant.",
  haggai:
    "Haggai delivered four messages in the autumn of 520 BC to the returned exiles in Jerusalem. Sixteen years after the first return the temple foundation still sat unfinished while people built paneled houses, and harvests were failing. His audience was a discouraged, distracted community; his message was to reorder their priorities and get to work.",
  zechariah:
    "Zechariah began prophesying two months after Haggai in 520 BC, to the same rebuilding community under Persian rule. His night visions reassured them that God saw their small day, that the high priest's guilt was removed, and that the temple would be finished by his Spirit. The later chapters look further ahead to a coming king and a purified people.",
  malachi:
    "Malachi speaks to Judah around 460-430 BC, a century after the return, when the temple was rebuilt but the excitement had faded. Priests offered blemished animals, tithes were withheld, divorce was casual, and people asked whether serving God paid. The book closes the Old Testament with a community waiting for a messenger and a day of the LORD.",
  matthew:
    "Matthew was written for Jewish Christians, possibly in Syria, likely after the temple's destruction in AD 70, when synagogue and church were separating painfully. Its readers needed to know that following Jesus was not abandoning Israel's story but fulfilling it. That is why it quotes the Old Testament constantly, arranges Jesus' teaching in five great blocks, and ends with a mission to all nations.",
  mark:
    "Early tradition links Mark to Peter's preaching in Rome, and the Gospel is usually dated around AD 65-75, when Christians in Rome had faced Nero's persecution and war was brewing in Judea. Its readers needed a Jesus who suffered, and Mark gives them a Messiah whose path to glory runs through the cross and who calls disciples to the same road.",
  luke:
    "Luke wrote for Theophilus, a Gentile of some standing, and for readers like him across the Roman world who wanted an orderly account of who Jesus was. His audience was largely non-Jewish, which is why he explains Jewish customs, traces Jesus' family line back to Adam, and highlights Samaritans, women, the poor and tax collectors. Luke and Acts together show that the gospel was always meant for the nations.",
  john:
    "John is usually dated around AD 90-100, to communities that had been pushed out of their synagogues for confessing Jesus as Messiah. Its readers faced hostility and doubt and needed to know who Jesus really was and that believing in him brought life now. The long conversations and \"I am\" statements were written to deepen faith, not just to report events.",
  acts:
    "Acts continues Luke's account for Theophilus, covering roughly AD 30-62, from Jerusalem to Rome. Its readers lived in a Roman world where a new movement of Jews and Gentiles worshiping a crucified man looked suspicious; Acts shows Roman officials repeatedly finding the Christians innocent. It also answered an internal question: how did a Jewish Messiah's followers become a mostly Gentile church?",
  romans:
    "Paul wrote Romans around AD 57 from Corinth to a church he had not founded, made up of Jewish and Gentile believers. Jews had been expelled from Rome under Claudius and had recently returned, and tensions over law, food and status ran through the house churches. Paul's careful explanation of the gospel aimed to unite them, and to win their support for his mission to Spain.",
  '1-corinthians':
    "Corinth was a rich, rebuilt Roman colony and port, famous for immorality and a competitive culture of patrons and status. The church Paul founded around AD 50 reflected the city: divided into factions, tolerant of scandal, showy in worship. Writing from Ephesus around AD 54, Paul answers their letter point by point, applying the cross to a church that wanted to look impressive.",
  '2-corinthians':
    "After 1 Corinthians things got worse: a painful visit, a severe letter, and rival \"super-apostles\" who mocked Paul's weakness and unpaid ministry. Written around AD 55-56 after Titus brought news of reconciliation, this is Paul's most vulnerable letter. Its readers valued polished speech and strength; Paul argues that God's power shows up in clay jars.",
  galatians:
    "Paul's converts in the Roman province of Galatia were Gentiles who were told, after he left, that they needed circumcision and the Jewish law to be fully God's people. The letter, written perhaps around AD 48-55, is Paul's furious defense of a gospel that makes Gentiles full heirs by faith. It reflects the early church's biggest question: do you have to become a Jew to follow the Jewish Messiah?",
  ephesians:
    "Ephesus was a major port and religious center, home of the temple of Artemis and a thriving trade in magic. The letter, with few personal details, may have circulated among churches in the region. Its readers were Gentile converts surrounded by spiritual powers and pagan pressures, and it tells them who they are in Christ and how to live as one new people with Jewish believers.",
  philippians:
    "Philippi was a Roman colony full of retired soldiers, proud of its citizenship. Paul founded the church there around AD 50 (Acts 16) and wrote this letter from prison, probably in the early 60s, thanking them for a gift. Its readers faced outside pressure and some inside friction, and Paul points them to a citizenship in heaven and to Christ, who chose the lowest place.",
  colossians:
    "Colossae was a small town in the Lycus valley near Laodicea, with a church Paul had never visited. Some teaching there mixed Jewish rules, visions and reverence for angelic powers with faith in Christ, as if he were not enough. Written from prison around AD 60-62, the letter insists that Christ holds everything together and that believers are already complete in him.",
  '1-thessalonians':
    "Paul founded the church in Thessalonica, a busy port and provincial capital, around AD 50, and was driven out within weeks. Written soon after, this may be the earliest New Testament document. Its readers were new believers under pressure from their neighbors, grieving members who had died, and unsure about Christ's return; Paul writes to encourage and steady them.",
  '2-thessalonians':
    "Written shortly after the first letter, this one addresses a rumor, maybe from a forged letter, that the day of the Lord had already come. Some in the church had stopped working in anticipation. Its readers were still persecuted and needed both correction about the end and instruction to live responsibly in the meantime.",
  '1-timothy':
    "Timothy was Paul's younger coworker, left in Ephesus to deal with false teachers, disordered worship and questions about leadership. The Pastoral Letters reflect churches maturing into communities with recognized elders, deacons and care for widows, one reason their date is debated. The audience was a church in a wealthy city learning to be the household of God.",
  '2-timothy':
    "Written from Roman imprisonment, most likely under Nero, this is Paul's farewell. Many had deserted him, false teaching was spreading in Asia, and Timothy was timid. Its readers, through Timothy, were a second generation of believers who had not known the apostles, and the letter urges them to hold to the Scriptures and the gospel they were taught.",
  titus:
    "Titus was left on Crete, an island known for rough manners and a reputation for dishonesty, to set up leadership in young churches. The letter addresses false teachers of a Jewish flavor and communities that needed basic Christian ethics spelled out. Its readers were new believers in a hard culture, learning that grace teaches people to live differently.",
  philemon:
    "Philemon hosted a church in Colossae; Onesimus was his slave, who had run away, met Paul in prison, and become a Christian. Roman law gave masters total power over runaways. Paul's short letter, written around AD 60-62, asks a Christian master to receive a runaway as a brother without ever ordering him to. It shows how the gospel reworked relationships inside a system it did not immediately overturn.",
  hebrews:
    "Hebrews was written to believers, probably Jewish Christians and possibly in Rome, who were tired, facing hostility, and tempted to drift back toward the security of the synagogue and the temple system. Whether before or after AD 70 is debated. The author's answer is a sustained argument that Jesus fulfills and surpasses everything the old covenant offered, so going back is going nowhere.",
  james:
    "James wrote to Jewish Christians \"scattered among the nations\", likely early, from Jerusalem. His readers were mostly poor, working for wealthy landowners, and sometimes fawning over rich visitors while neglecting the needy in their own gatherings. The letter reads like a Christian wisdom book, echoing Jesus' teaching, for people who had faith but needed it to show.",
  '1-peter':
    "1 Peter addresses Christians across five provinces of Asia Minor, mostly Gentile converts who were being shunned and slandered by neighbors for abandoning the old gods and festivals. This was social hostility more than official persecution. Peter calls them exiles and priests and teaches how to live honorably in a society that misunderstands them.",
  '2-peter':
    "2 Peter is written as Peter's last testament, against false teachers who used grace as a license and mocked the promise of Christ's return because nothing had changed. Its readers were second-generation Christians coping with the delay of the end. The letter reminds them of the apostles' eyewitness testimony and of God's patience.",
  '1-john':
    "1 John was written to churches, likely around Ephesus, that had been split by a group who left claiming superior knowledge of Christ and denying that he had truly come in the flesh. Those who remained were shaken and asked whether they were the real believers. John writes to give assurance, with tests of truth, obedience and love.",
  '2-john':
    "This brief note addresses a church, \"the lady chosen by God\", in the same situation as 1 John: traveling teachers were spreading a view of Jesus that denied his humanity. In a world where churches depended on hospitality to itinerant preachers, the elder tells them not to host such teachers.",
  '3-john':
    "3 John is a personal letter to Gaius about hospitality to traveling missionaries, in a network of house churches where welcoming the right people mattered. Diotrephes, a local leader, was refusing the elder's messengers and expelling those who received them. The letter shows early church life as it actually was: real personalities, real conflicts.",
  jude:
    "Jude writes urgently to churches infiltrated by teachers who turned grace into permission for immorality and rejected authority. His readers knew Jewish traditions and writings like 1 Enoch, which he quotes. The letter's warning examples from Israel's history made sense to people who saw themselves as the continuation of that story.",
  revelation:
    "Revelation was written to seven churches in the Roman province of Asia, probably in the mid-90s under Domitian, when emperor worship was a civic expectation and Christians who refused faced economic and social pressure, sometimes death. John's readers knew the Old Testament deeply and lived in real cities with real temptations: compromise, complacency, fear. The visions gave them a view of history from the throne room.",
}
