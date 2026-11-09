/* Předmět: Úvod do počítačových sítí
 * Každý předmět = jeden soubor v src/subjects/. Šablona: src/subjects/_sablona.js.txt
 * Otázka: [téma, otázka, správná odpověď, [3 špatné odpovědi], vysvětlení nebo null]
 */
Biflovna.subject({
  id: "upcs",
  name: "Úvod do počítačových sítí",
  short: "ÚPS",
  teacher: "Ing. Zdeněk Votruba, Ph.D.",
  note: "Zápočet · přednášky 1–6",
  color: "#1D4ED8",
  icon: "net",
  legacyStorage: "kvizSiteStats_v1",

  topics: {
  zak:{n:"Základní pojmy",                 c:"#3B82F6"},
  osi:{n:"OSI, TCP/IP, TCP/UDP",           c:"#6366F1"},
  pro:{n:"Aplikační protokoly",            c:"#DB2777"},
  adr:{n:"Adresace MAC/IPv4/IPv6",         c:"#059669"},
  msk:{n:"Maska, subnetting, DHCP",        c:"#D97706"},
  dns:{n:"DNS a URL",                      c:"#0891B2"},
  prv:{n:"Aktivní/pasivní prvky",          c:"#EA580C"},
  nat:{n:"Switch, router, NAT, firewall",  c:"#DC2626"},
  kab:{n:"Koax a kroucená dvoulinka",      c:"#65A30D"},
  opt:{n:"Optika",                         c:"#0284C7"},
  wif:{n:"Bezdrát, WiFi, FSO",             c:"#C026D3"},
},

  questions: [
// ---------- ZÁKLADNÍ POJMY (14) ----------
["zak","Co je počítačová síť?","Propojení několika uzlů (nodes), které spolu komunikují",["Jeden výkonný počítač se sdíleným diskem","Soubor programů pro přístup na Internet","Pouze kabeláž v budově"],"Uzlům se říká také stanice (workstations)."],
["zak","Co znamená zkratka NIC?","Network Interface Card – síťová karta",["Network Internet Connection","Node Identification Code","Network Integrated Controller"],null],
["zak","Funkční síť = ?","HW + komunikační protokol",["HW + operační systém","HW + DNS server","Kabely + router"],"Funkční PC = HW + OS, funkční síť = HW + komunikační protokol."],
["zak","Co NEPATŘÍ mezi tři principy přenosu dat sítí?","Šifrování všech přenášených dat",["Rozdělení dat na pakety","Jednoznačné adresy odesílatele i adresáta","Univerzální přenosový protokol"],"Tři principy: PAKETY, ADRESY, PROTOKOL."],
["zak","Proč se data při přenosu dělí na pakety?","Aby neucpávaly síť",["Aby byla automaticky šifrovaná","Aby se nemusela adresovat","Protože kabel neumí přenést víc než 1 bajt"],null],
["zak","Co je podle přednášky LIMITUJÍCÍ faktor přenosu dat, a ne požadavek na něj?","Různorodost",["Množství přenášených dat","Univerzálnost přenosu","Spolehlivost doručení dat uživateli"],"Požadavky: množství, rychlost, spolehlivost, univerzálnost. Limity: rychlost média, různorodost, množství služeb, spolehlivost a bezpečnost."],
["zak","Co je přenosový (komunikační) protokol?","Předpis (SW), podle kterého se navazuje spojení a zajišťuje přenos dat",["Fyzický kabel mezi dvěma počítači","Síťová karta s MAC adresou","Adresa počítače v síti"],"Je rozdělený do hierarchických vrstev a nezávisí na implementaci."],
["zak","Co NENÍ funkcí přenosového protokolu?","Přidělit uživateli heslo k e-mailu",["Detekovat okolní zařízení","Poznat začátek a konec paketu","Detekovat a opravit chyby"],"Funkce: detekce zařízení, atributy, začátek/konec paketu, formát paketu, detekce a oprava chyb, ukončení komunikace."],
["zak","Čím adresuje protokol IPX/SPX?","MAC adresami",["IP adresami","DNS jmény","URL adresami"],"Proto funguje jen v LAN (sítě Novell)."],
["zak","Co platí o IPX/SPX?","Je rychlý, cesta je dopředu známá, jen pro LAN, dnes na ústupu",["Je univerzální a používá ho celý Internet","Adresuje přes IP adresy","Hledá trasu mezi sítěmi"],null],
["zak","Co platí o TCP/IP?","Je univerzální, hledá trasu a jde o „rodinu protokolů“ (protocol suite)",["Funguje jen v LAN a cesta je předem známá","Adresuje pouze MAC adresami","Je to jediný protokol bez vrstev"],null],
["zak","Jaký je rozdíl mezi přenosovým a aplikačním protokolem?","Přenosový přenese data sítí, aplikační je předá konkrétní aplikaci",["Aplikační přenese data sítí, přenosový je předá aplikaci","Přenosový funguje jen v LAN, aplikační jen na Internetu","Žádný, jsou to synonyma"],"Přenosový: IP, IPX. Aplikační: HTTP, DNS, FTP…"],
["zak","Který z protokolů je PŘENOSOVÝ (ne aplikační)?","IP",["HTTP","DNS","FTP"],null],
["zak","Lokální síť běží na IPX a potřebuje se připojit k Internetu. Jak se to podle přednášky běžně řeší?","Počítače provozují současně IPX i TCP/IP",["Router přeloží MAC adresy z IPX na DNS jména","IPX pakety se beze změny pošlou do Internetu","IPX se nahradí protokolem UDP na linkové vrstvě"],"Počítače a sítě mohou fungovat na několika protokolech současně."],

// ---------- OSI / TCP/IP (21) ----------
["osi","Kolik vrstev má model OSI a kolik TCP/IP?","OSI 7, TCP/IP 4",["OSI 4, TCP/IP 7","Oba 7","OSI 5, TCP/IP 3"],null],
["osi","Které jsou vrstvy modelu TCP/IP?","Síťové rozhraní, síťová, transportní, aplikační",["Fyzická, linková, síťová, aplikační","Fyzická, relační, prezentační, aplikační","Linková, síťová, relační, aplikační"],null],
["osi","Která vrstva OSI zajišťuje logickou (IP) adresaci a směrování?","3. síťová",["2. linková","4. transportní","1. fyzická"],null],
["osi","Která vrstva OSI zajišťuje MAC adresaci, rámce a detekci chyb (CRC)?","2. linková (datového spoje)",["3. síťová","1. fyzická","4. transportní"],null],
["osi","Která vrstva OSI zajišťuje spolehlivé doručení, řízení toku a porty?","4. transportní",["3. síťová","5. relační","7. aplikační"],null],
["osi","Která vrstva OSI řeší formát dat, kódování, kompresi a šifrování?","6. prezentační",["5. relační","7. aplikační","2. linková"],null],
["osi","Která vrstva OSI řídí relaci (dialog)?","5. relační",["6. prezentační","4. transportní","7. aplikační"],null],
["osi","Jaká je jednotka dat na transportní vrstvě?","Segment",["Rámec","Paket","Bit"],"Transportní = segment, síťová = paket/datagram, linková = rámec, fyzická = bity."],
["osi","Jaká je jednotka dat na linkové vrstvě?","Rámec",["Segment","Paket","Bit"],"Transportní = segment, síťová = paket/datagram, linková = rámec, fyzická = bity."],
["osi","Kterým vrstvám TCP/IP odpovídají vrstvy OSI 5, 6 a 7?","Aplikační",["Transportní","Síťové","Síťovému rozhraní"],"OSI 1+2 = síťové rozhraní, 3 = síťová, 4 = transportní, 5–7 = aplikační."],
["osi","Na které vrstvě TCP/IP jsou Ethernet, Token Ring a FDDI?","Síťové rozhraní",["Síťová","Transportní","Aplikační"],null],
["osi","Který protokol NEPATŘÍ na síťovou vrstvu TCP/IP?","HTTP",["ARP","ICMP","IGMP"],"Síťová vrstva: IP, ARP, RARP, ICMP, IGMP, IGRP, IPSEC."],
["osi","Kde je implementována transportní vrstva TCP/IP?","Jen v koncových zařízeních",["Ve všech prvcích sítě","Jen v routerech","Jen ve switchích"],"Síťová vrstva je naopak ve všech prvcích sítě."],
["osi","Jaká služba je TCP?","Spojovaná a spolehlivá – naváže spojení, potvrzuje příjem, garantuje pořadí",["Nespojovaná a nespolehlivá – data jen vyšle bez navázání spojení a bez potvrzení","Spojovaná, ale nespolehlivá – naváže spojení, ale příjem nepotvrzuje ani nehlídá pořadí","Nespojovaná, ale hlídá pořadí – nepotvrzuje příjem, jen řadí datagramy"],null],
["osi","Co se může stát s datagramem UDP?","Může se ztratit, přehodit nebo dojít víckrát",["Nic, UDP vše garantuje","Vždy dojde právě jednou ve správném pořadí","Nemůže se ztratit, jen zpozdit"],null],
["osi","Online hra průběžně posílá polohu hráče. Proč se pro ni hodí UDP?","Počítá se se ztrátami a nevyplatí se znovu posílat staré zprávy",["Garantuje doručení všech zpráv ve správném pořadí","Před přenosem naváže spojení s každým z hráčů","Cílový uzel potvrzuje příjem každé části dat"],"Stejně tak VoIP. UDP dále DNS a DHCP (otázka–odpověď)."],
["osi","Na jednom serveru běží web i e-mail se stejnou IP adresou. Co odliší data pro každou službu?","Číslo portu",["MAC adresa síťové karty","Maska sítě serveru","Adresa brány v síti"],"Spojení určuje IP adresa, port a transportní protokol."],
["osi","Jak posílají data TCP a UDP?","TCP po menších částech, UDP celý blok v jednom datagramu",["TCP celý blok najednou, UDP po částech","Oba posílají jen po jednom bitu","Oba celý blok najednou"],null],
["osi","Co jsou porty?","Domluvená čísla, která rozlišují aplikace na jednom počítači",["Fyzické zdířky na síťové kartě","Jiné označení pro MAC adresu","Čísla podsítí"],null],
["osi","Čím je jednoznačně určeno síťové spojení aplikace?","IP adresou + portem + transportním protokolem",["MAC adresou + IP adresou","IP adresou + maskou","DNS jménem + URL"],null],
["osi","Který transportní protokol používá DNS?","TCP i UDP",["Jen TCP","Jen UDP","Ani jeden, jen IP"],null],

// ---------- APLIKAČNÍ PROTOKOLY (12) ----------
["pro","Který protokol dynamicky přiděluje IP adresy?","DHCP",["DNS","SNMP","NTP"],null],
["pro","Který protokol překládá doménová jména na IP adresy?","DNS",["DHCP","HTTP","ARP"],null],
["pro","Který protokol slouží k odesílání e-mailu?","SMTP",["POP3","IMAP","SNMP"],null],
["pro","Který protokol slouží ke stahování pošty z poštovního serveru?","POP3",["SMTP","FTP","NTP"],"IMAP = práce se zprávami přímo na serveru."],
["pro","Který protokol synchronizuje čas?","NTP",["SNMP","SMTP","NFS"],null],
["pro","Který protokol slouží ke správě síťových zařízení?","SNMP",["SMTP","NTP","SMB"],null],
["pro","Který protokol je zabezpečený vzdálený terminál?","SSH",["Telnet","FTP","TFTP"],"Telnet = nezabezpečený virtuální terminál."],
["pro","Který protokol slouží ke sdílení souborů a tiskáren ve Windows?","SMB",["NFS","NNTP","XMPP"],"NFS = sdílení souborů v Unixu."],
["pro","K čemu slouží NTLM?","Ověřování (autentizace) ve Windows",["Chat","Synchronizace času","Přenos WWW stránek"],null],
["pro","Uživatel odešle e-mail a příjemce si ho stáhne do počítače. Které protokoly se použijí?","SMTP pro odeslání, POP3 pro stažení",["POP3 pro odeslání, SMTP pro stažení","SNMP pro odeslání, FTP pro stažení","IMAP pro odeslání, NTP pro stažení"],null],
["pro","Co umožňuje WebDAV?","Práci se soubory přes HTTP",["Ověřování ve Windows","Chat","Překlad jmen na IP"],null],
["pro","Co je TFTP?","Jednoduchý protokol pro přenos souborů",["Zabezpečený terminál","Synchronizace času","Přenos WWW"],null],

// ---------- ADRESACE (23) ----------
["adr","Kolik bitů má MAC, IPv4 a IPv6 adresa?","48, 32, 128",["32, 48, 128","48, 64, 128","64, 32, 256"],null],
["adr","Jak se zapisuje MAC adresa?","6 dvojic hexa číslic, např. A0-48-1C-92-DB-CF",["4 oktety dekadicky, např. 192.168.0.1","8 skupin po 4 hexa číslicích","Slovní jméno, např. www.czu.cz"],null],
["adr","Jak se zapisuje IPv6 adresa?","8 skupin po 4 hexa číslicích",["4 oktety dekadicky","6 dvojic hexa číslic","16 oktetů dekadicky"],"Např. 2001:0718:1c01:0016:0214:22ff:fec9:0ca5"],
["adr","Kolik je přibližně IPv4 adres?","2^32 ≈ 4 × 10^9",["2^48 ≈ 2,8 × 10^14","2^128 ≈ 3 × 10^38","2^16 = 65 536"],null],
["adr","Kolik je přibližně IPv6 adres?","2^128 ≈ 3 × 10^38",["2^32 ≈ 4 × 10^9","2^48 ≈ 2,8 × 10^14","2^64 ≈ 1,8 × 10^19"],"Teoreticky ~6 × 10^23 adres na 1 m² zemského povrchu."],
["adr","Jaké je hlavní pravidlo adresace?","V jednom okamžiku nesmí být v síti dva uzly se stejnou adresou",["Každý uzel musí mít aspoň dvě IP adresy","Adresy se musí každou hodinu měnit","MAC a IP musí být stejně dlouhé"],null],
["adr","Dá se MAC adresa změnit?","Teoreticky je neměnná, prakticky jde změnit",["Nikdy, je vypálená napevno","Mění se při každém restartu","Přiděluje ji DHCP server"],null],
["adr","K čemu se MAC adresa v TCP/IP dnes NEPOUŽÍVÁ?","Ke směrování paketů mezi sítěmi na Internetu",["K přeskoku mezi dvěma sousedními uzly","K identifikaci zařízení při přidělování IP z DHCP","K filtrování a firewallu"],"MAC: přeskok mezi sousedy, identifikace pro DHCP, filtrování/firewall, ověření připojení (WiFi)."],
["adr","Co platí o IP adresách a rozhraních?","Jedno rozhraní může mít víc IP, ale stejná IP nesmí být na víc rozhraních",["Stejná IP může být na víc rozhraních","Rozhraní smí mít jen jednu IP","IP adresa nemusí být v síti jednoznačná"],null],
["adr","Co NEPATŘÍ mezi nástroje proti nedostatku IPv4 adres?","DNS",["DHCP","Subnetting a CIDR","NAT a PAT"],"DHCP, subnetting/CIDR, NAT/PAT problém jen zmírňují – skutečné řešení je IPv6."],
["adr","Která adresa je PRIVÁTNÍ?","172.20.5.1",["172.32.0.1","192.169.1.1","11.0.0.1"],"Privátní B: 172.16.0.0 – 172.31.255.255."],
["adr","Která adresa je VEŘEJNÁ?","172.15.10.10",["10.200.1.1","192.168.50.5","172.31.255.254"],"172.15.x.x je těsně pod privátním rozsahem 172.16–172.31."],
["adr","Která z adres NEPATŘÍ do privátního rozsahu?","192.167.1.1",["192.168.1.1","10.0.0.138","172.16.0.1"],null],
["adr","Jaký je rozsah privátních adres třídy A?","10.0.0.0 – 10.255.255.255",["172.16.0.0 – 172.31.255.255","192.168.0.0 – 192.168.255.255","100.0.0.0 – 100.255.255.255"],null],
["adr","Jaký je rozsah privátních adres třídy B?","172.16.0.0 – 172.31.255.255",["172.0.0.0 – 172.255.255.255","172.16.0.0 – 172.16.255.255","10.0.0.0 – 10.255.255.255"],"16 × 65 536 adres."],
["adr","Jaký je rozsah privátních adres třídy C?","192.168.0.0 – 192.168.255.255",["192.0.0.0 – 192.255.255.255","192.168.0.0 – 192.168.0.255","172.16.0.0 – 172.31.255.255"],"256 × 256 adres."],
["adr","Co platí o veřejné IP adrese?","Je dostupná z celého Internetu, větší riziko útoku, potřebuje kvalitní firewall",["Je dostupná jen z vnitřní sítě až k routeru, proto nepotřebuje firewall","Nepotřebuje žádný firewall, protože ji chrání NAT poskytovatele","Na veřejné síti se okamžitě zahodí a musí se překládat přes APIPA"],null],
["adr","Co se stane s paketem s privátní adresou odesílatele na veřejné síti?","Hned se zahodí",["Normálně se doručí","Router mu přidělí APIPA","Pošle se na všechny porty"],null],
["adr","Kam jde paket směřující ven z privátní sítě?","Na bránu (NAT)",["Na DNS server","Na všechny uzly v síti","Na DHCP server"],null],
["adr","Kdy si zařízení přidělí APIPA adresu a jaký má rozsah?","Když nedostane IP od DHCP; 169.254.x.x",["Když se připojí k WiFi; 192.168.x.x","Při statické IP; 10.0.x.x","Když selže DNS; 127.0.x.x"],"Zařízení pak hledá DHCP dál – každé 3 minuty."],
["adr","Co funguje, když má počítač APIPA adresu?","Lokální služby, ale komunikace mimo počítač ne",["Vše včetně Internetu","Jen Internet, lokální služby ne","Komunikace v LAN i přes bránu"],null],
["adr","Počítač má adresu 169.254.12.7 a nefunguje mu nic mimo něj. Co je nejpravděpodobnější příčina?","Nedostal adresu od DHCP serveru",["DNS server přeložil jméno na špatnou IP","Router mu přidělil veřejnou IP adresu","Má nastavenou masku podsítě /30"],"APIPA se použije, když zařízení nezíská adresu z DHCP; server pak hledá každé 3 minuty."],
["adr","MAC má víc kombinací než IPv4. Proč tedy potřebujeme IP adresy?","MAC adresy nejsou hierarchické, nejde podle nich hledat cestu mezi sítěmi",["Protože MAC adresy jsou příliš krátké","Protože MAC se nedá zapsat hexadecimálně","Protože MAC funguje jen bezdrátově"],"Proto IPX/SPX (adresuje MAC) funguje jen v LAN."],

// ---------- MASKA, SUBNETTING, DHCP (23) ----------
["msk","Jaké parametry síťového připojení má každé zařízení?","IP adresa, maska, brána, adresa DHCP, adresa DNS",["IP adresa, MAC, port, URL","Jen IP adresa a MAC","Maska, URL, heslo k WiFi"],null],
["msk","Co v masce označují jedničky a co nuly?","Jedničky část sítě, nuly část počítače",["Jedničky část počítače, nuly část sítě","Jedničky bránu, nuly broadcast","Jedničky veřejné adresy, nuly privátní"],"Maska má 32 bitů jako IPv4 a určuje rozsah vnitřní sítě."],
["msk","Co musí mít všechna zařízení v jedné síti, aby spolu komunikovala?","Stejnou masku a stejné první bity IP adresy",["Stejnou MAC adresu","Stejnou celou IP adresu","Jiné brány"],"Jinak nekomunikují, i když jsou fyzicky propojená."],
["msk","Proč 10.10.10.5 s maskou 255.255.255.0 nekomunikuje přímo s 10.10.11.2?","Maska /24 určuje síť prvními 3 oktety a 10.10.10 ≠ 10.10.11 – jsou to různé sítě",["Protože 10.10.11.2 je veřejná adresa","Protože obě adresy jsou APIPA","Protože maska 255.255.255.0 zakazuje jakoukoli komunikaci"],"Pakety musí jít přes router (bránu)."],
["msk","Co je brána (gateway)?","Adresa routeru, přes který jdou všechny požadavky mimo „domácí“ síť",["Adresa DNS serveru, který překládá jména všech uzlů v domácí síti","MAC adresa switche, přes který jdou rámce mezi porty v jedné síti","Broadcast adresa sítě, na kterou se posílají pakety všem uzlům"],"Zvykem je jednička na konci, např. 10.30.0.1."],
["msk","Router má uvnitř 10.10.0.1/255.255.255.0, PC mají 10.10.0.100, .110, .120. Jak nastavíš další PC?","10.10.0.130, maska 255.255.255.0, brána 10.10.0.1",["10.10.1.130, maska 255.255.255.0, brána 10.10.0.1","10.10.0.120, maska 255.255.255.0, brána 10.10.0.1","10.10.0.130, maska 255.255.255.0, brána 85.25.69.11"],"Volná adresa ze stejné sítě, stejná maska, brána = vnitřní IP routeru."],
["msk","Patří při prefixu /26 adresy 192.168.1.130 a 192.168.1.190 do stejné podsítě?","Ano, obě leží v 192.168.1.128 – .191",["Ne, .130 leží v podsíti .128 – .159","Ne, .190 leží v podsíti .160 – .191","Ne, každá leží v jiné podsíti /26"],"Velikost /26 je 64 → podsítě .0, .64, .128, .192."],
["msk","Kolik podsítí /28 vznikne rozdělením sítě /24?","16",["8","14","32"],"4 půjčené bity → 2⁴ = 16."],
["msk","PC má 192.168.1.20/24 a bránu 192.168.2.1. V LAN komunikuje, ven ne. Proč?","Brána není ve stejné síti jako počítač",["Maska /24 neumožňuje komunikaci mimo síť","Adresa .20 je v síti /24 vyhrazená pro broadcast","Privátní adresa nemůže mít nastavenou bránu"],"Brána musí být adresa routeru z domácí sítě, tady 192.168.1.x."],
["msk","Spoj mezi dvěma routery potřebuje právě 2 použitelné adresy. Který prefix zvolíš?","/30",["/29","/28","/27"],"/30 = 4 adresy − síť − broadcast = 2."],
["msk","Kolik použitelných adres má podsíť /26?","62",["64","30","126"],"64 adres − adresa sítě − broadcast = 62."],
["msk","Do podsítě potřebuješ připojit 50 počítačů. Který nejmenší prefix stačí?","/26",["/27","/28","/25"],"/27 má jen 30 použitelných adres, /26 má 62."],
["msk","Jaká je broadcast adresa podsítě 192.168.1.64/26?","192.168.1.127",["192.168.1.63","192.168.1.128","192.168.1.191"],"Podsíť má 64 adres: .64 je síť, .127 poslední adresa = broadcast."],
["msk","Rozděluješ 192.168.1.0/24 na 4 podsítě. Jaká bude maska?","255.255.255.192 (/26)",["255.255.255.224 (/27)","255.255.255.128 (/25)","255.255.255.240 (/28)"],"4 podsítě = 2 půjčené bity (2² = 4) → /26."],
["msk","Rozděluješ síť /24 na 8 podsítí. Jaký bude prefix?","/27",["/26","/28","/25"],"8 = 2³ → 3 půjčené bity → /27."],
["msk","Co udělá každý „půjčený“ bit při subnettingu?","Zdvojnásobí počet podsítí a způlí jejich velikost",["Zdvojnásobí velikost podsítí","Přidá jednu podsíť","Nezmění nic, jen masku"],null],
["msk","Jaký je rozsah podsítě B při dělení 192.168.1.0/24 na 4 podsítě?","192.168.1.64 – 192.168.1.127",["192.168.1.63 – 192.168.1.127","192.168.1.65 – 192.168.1.128","192.168.1.0 – 192.168.1.63"],"Pozor – na slidu je překlep .63, správně .64."],
["msk","Do které /26 podsítě patří adresa 192.168.1.200?","192.168.1.192 – .255",["192.168.1.128 – .191","192.168.1.200 – .255","192.168.1.64 – .127"],null],
["msk","Jaká je adresa sítě pro 192.168.1.100/27?","192.168.1.96",["192.168.1.64","192.168.1.100","192.168.1.128"],"Velikost /27 = 32 → sítě 0, 32, 64, 96, 128… 100 leží v .96–.127."],
["msk","Rychlý trik: jak spočítáš velikost podsítě z masky?","256 − poslední oktet masky",["Poslední oktet masky × 2","256 / prefix","32 − prefix"],"Např. 256 − 192 = 64."],
["msk","Proč nejsou v podsíti použitelné dvě adresy?","První je adresa sítě a poslední broadcast",["Jsou rezervované pro DNS a DHCP","Jsou rezervované pro APIPA","Patří vždy routeru a switchi"],null],
["msk","Podle čeho DHCP server identifikuje zařízení, kterému přiděluje IP?","Podle MAC adresy",["Podle DNS jména","Podle čísla portu","Podle URL"],null],
["msk","Komu DHCP přiděluje IP dynamicky a komu staticky?","Dynamicky pracovním stanicím, staticky serverům a aktivním prvkům",["Dynamicky routerům, staticky stanicím","Všem jen staticky","Všem jen dynamicky"],"Ruční konfigurace má být jen výjimka."],

// ---------- DNS a URL (14) ----------
["dns","Jaké tři typy adres uzlu v síti existují (kromě MAC)?","IP, DNS, URL",["IP, MAC, port","DNS, URL, NAT","IPv4, IPv6, APIPA"],null],
["dns","Proč potřebujeme DNS?","TCP/IP jména „neumí“ – v paketu jsou jen IP adresy, DNS překládá jméno na IP",["Protože bez DNS nefunguje MAC adresace","Protože DNS přiděluje IP adresy","Protože DNS šifruje provoz"],null],
["dns","Je přístup přes DNS jméno rychlejší než přímo přes IP?","Ne, je vždy pomalejší (dotaz navíc) a může být méně spolehlivý",["Ano, je vždy rychlejší, protože DNS server si odpověď pamatuje","Je stejně rychlý, jméno se překládá až v cílovém počítači","Je rychlejší jen přes UDP, přes TCP je pomalejší než IP"],"Proto má každá oblast víc DNS serverů."],
["dns","Existuje vztah mezi čísly IP adresy a doménami?","Ne, žádný přímý vztah není",["Ano, každá doména odpovídá jednomu oktetu","Ano, první oktet určuje zemi","Ano, .cz má vždy IP začínající 193"],"193.84.45.240 = moodle.tf.czu.cz, ale čísla doménám neodpovídají."],
["dns","Kdo odkazuje na DNS server konkrétní domény?","DNS servery vyšších domén",["DHCP server","Router uživatele přes NAT","Switch podle MAC"],null],
["dns","Čím je nebezpečné napadené DNS?","Vrací jiné adresy a posílá uživatele na podvodné stránky",["Zpomalí kabeláž na 10 Mb/s a přeruší spojení s routerem","Vymaže MAC adresy ze switchů a síť přestane fungovat","Vypne DHCP server, takže zařízení dostanou APIPA adresy"],null],
["dns","Uživatel zadá www.tf.czu.cz. Co se musí stát, než počítač pošle paket na server?","DNS server přeloží jméno na IP adresu",["DHCP server přidělí cílovému serveru jméno","Switch převede doménové jméno na MAC adresu","Router přeloží doménové jméno pomocí NAT"],"V paketu jsou jen IP adresy, jména TCP/IP „neumí“."],
["dns","Web jde otevřít přes IP adresu, ale přes jeho doménové jméno ne. Kde je nejspíš problém?","V DNS – server je nedostupný nebo má neaktuální tabulku",["V kabeláži mezi počítačem a nejbližším switchem","V MAC adrese síťové karty uživatele","V masce sítě nastavené na cílovém serveru"],"Když funguje IP adresa, síť je v pořádku a selhává překlad jména."],
["dns","Co znamená zkratka URL?","Uniform Resource Locator",["Universal Routing Link","Unique Resource Line","Uniform Remote Login"],null],
["dns","Proč vznikla URL adresa?","Aby jeden počítač (jedna IP) mohl nabízet víc služeb",["Aby nahradila IP adresy v paketech","Aby šifrovala hesla","Aby přidělovala MAC adresy"],"Je nezbytná pro WWW – kvůli ní vznikla."],
["dns","Co umí URL navíc oproti DNS adrese?","Určit protokol (službu), jméno a heslo, port a cestu k souboru",["Nic navíc, je to jen jiný zápis stejné doménové adresy","Jen určit MAC adresu síťové karty cílového serveru","Jen zkrátit adresu a přeložit ji na IP bez DNS serveru"],null],
["dns","Jaký je správný tvar URL?","protokol://[jméno[:heslo]@]adresa_serveru[:port][cesta]",["adresa_serveru://protokol[:port]@jméno","[jméno@]protokol:adresa_serveru/port","protokol@adresa_serveru://[cesta][:heslo]"],null],
["dns","Co je v URL ftp://jan:tajne@Alpha.czu.cz:2121/index.htm číslo 2121?","Port",["Heslo","Cesta k souboru","Jméno uživatele"],"protokol://[jméno[:heslo]@]server[:port][cesta]"],
["dns","Která část adresy www.tf.czu.cz je doména nejvyšší úrovně?","cz",["www","tf","czu"],"Tvar: jméno_počítače.doména_i…doména_1 – nejvyšší je vpravo."],

// ---------- AKTIVNÍ / PASIVNÍ PRVKY (16) ----------
["prv","Jaký je rozdíl mezi pasivním a aktivním prvkem?","Pasivní jen přenáší paket, aktivní mění jeho chování při přenosu",["Aktivní jen přenáší paket, pasivní ho mění","Pasivní pracuje na 3. vrstvě, aktivní na 1.","Pasivní prvky jsou bezdrátové, aktivní kabelové"],null],
["prv","Který prvek je PASIVNÍ?","Patch panel",["Switch","Router","Hub"],"Pasivní: kabely, zásuvky, konektory, patch panely, rozvaděče."],
["prv","Který prvek je AKTIVNÍ?","Repeater",["Konektor","Zásuvka","Rozvaděč"],"Aktivní: hub, switch, router, repeater, media konvertor, firewall."],
["prv","Na které vrstvě OSI pracuje hub, switch a router?","Hub 1, switch 2, router 3",["Hub 2, switch 3, router 4","Hub 1, switch 3, router 2","Všechny na 3"],null],
["prv","Proč je switch bezpečnější než hub, když jde o odposlech provozu?","Hub posílá data všemi porty, switch jen na port adresáta",["Hub data šifruje, switch je posílá nešifrovaně","Switch posílá data všemi porty, hub jen adresátovi","Hub pracuje na 3. vrstvě, switch až na 7. vrstvě"],"U switche už médium není sdílené."],
["prv","Co dělá SWITCH s daty?","Pošle je jen na port adresáta (podle MAC)",["Pošle je všemi porty","Směruje je mezi sítěmi podle IP","Převede je na světlo"],"Médium není sdílené → vyšší výkon i bezpečnost."],
["prv","Co dělá ROUTER?","Spojuje alespoň dvě sítě a přenáší mezi nimi data",["Rozesílá signál všem portům","Jen zesiluje signál","Převádí analog na digitál"],"Základní prvek konektivity a bezpečnosti."],
["prv","Jaké zpoždění způsobuje hub?","Jen 1 bit – nižší latence než switch",["Celý rámec – vyšší latence než switch","Celý paket","Žádné zpoždění, 0 bitů"],null],
["prv","Kolik segmentů lze propojit huby u 10 Mbit/s a u 100 Mbit/s sítě?","10 Mbit/s: 5 segmentů (4 huby), 100 Mbit/s: 3 segmenty (2 huby)",["10 Mbit/s: 3 segmenty, 100 Mbit/s: 5 segmentů","Oba neomezeně","Oba max. 2 segmenty"],null],
["prv","Co umí managovatelný switch?","QoS, shaping, VLAN",["NAT a PAT","Převod signálu na světlo","Přidělovat veřejné IP"],null],
["prv","Co je „jednoruký“ router?","Router, který směruje mezi VLAN na jednom portu",["Router, který spojuje pouze dvě fyzické sítě","Router se dvěma porty pro dvě různé VLAN","Router pracující výhradně na 2. vrstvě OSI"],null],
["prv","Co dělá REPEATER?","Poškozený signál opraví, zesílí a pošle dál – prodlouží dosah",["Spojuje dvě různé sítě a vybírá cestu podle IP adresy","Překládá privátní adresy na jednu veřejnou adresu (NAT)","Filtruje provoz podle MAC a posílá rámce jen adresátovi"],"Pracuje na 1. (fyzické) vrstvě."],
["prv","Co je MODEM?","Media konvertor – převede signál z jednoho média na jiné (často analog na digitál)",["Prvek 3. vrstvy, který směruje pakety mezi různými sítěmi","Pasivní prvek pro uchycení a ochranu kabelů v rozvaděči","Server, který zařízením přiděluje IP adresy z rozsahu"],"Např. DSL modem: telefonní linka → UTP."],
["prv","Co je PowerLine (HomePlug)?","Přenos dat po rozvodech 230 V",["Přenos dat světlem","Přenos dat po optice","Napájení switche přes UTP"],"LiFi = UTP → světlo vzduchem."],
["prv","Chceš propojit síť 10.1.0.0/24 se sítí 10.2.0.0/24. Který prvek je nutný?","Router",["Hub","Switch","Repeater"],"Hub, switch a repeater pracují v rámci jedné LAN."],
["prv","Kdo směruje pakety v mobilních ad-hoc sítích?","Každý počítač routuje a forwarduje sám",["Jediný centrální router","Vždy switch","DNS server"],"V metalických a optických sítích je obvykle jeden router pro celou síť."],

// ---------- SWITCH/ROUTER SLUŽBY, NAT, PAT, FIREWALL (24) ----------
["nat","Switch dostane rámec pro MAC adresu, kterou ještě nezná. Co udělá?","Pošle ho všemi ostatními porty, chová se jako hub",["Rámec zahodí a ohlásí chybu odesílateli","Zeptá se DNS serveru, na kterém je portu","Předá ho routeru k překladu přes NAT"],"Backward Learning: port si zapamatuje podle prošlých rámců."],
["nat","Co dělá Backward Learning Algorithm?","Switch si pamatuje, na kterém portu je která MAC; neznámý cíl → chová se jako hub",["Router se z DNS dotazů učí, kterou cestou posílat pakety","Firewall se z historie provozu učí rozpoznat nové útoky","DHCP server si pamatuje, kterému zařízení dal jakou IP"],null],
["nat","Co řeší Spanning Tree Protocol (STP)?","Smyčky v síti – brání broadcast storm",["Překlad privátních adres na veřejné","Přidělování IP adres","Šifrování provozu"],"Switche se domluví a některé spoje nepoužívají. Nevýhoda: pomalé."],
["nat","Firma potřebuje hlubokou kontrolu obsahu a aplikací a cena nevadí. Který firewall vybere?","Firewall nové generace (NGFW)",["Firewall pro filtrování paketů","Obvodový firewall (circuit-level)","Stavový inspekční firewall"],"Ostatní tři obsah paketů neanalyzují."],
["nat","Co dělá routing?","Určuje cestu paketů podle routovacích tabulek",["Posílá data všem portům","Pamatuje si MAC na portech","Překládá jména na IP"],null],
["nat","Co je shaping (QoS)?","Omezení rychlosti klientů",["Šifrovaný kanál","Překlad portů","Řešení smyček"],null],
["nat","Co je VPN?","Šifrovaný kanál přes nezabezpečené médium",["Virtuální LAN vytvořená na switchi","Překlad privátních adres na veřejnou","Omezení rychlosti připojených klientů"],null],
["nat","Co NENÍ služba routeru podle přednášky?","Backward Learning Algorithm",["NAT a PAT","VPN","DHCP a DNS"],"Backward Learning je služba switche (2. vrstva)."],
["nat","Co je NAT?","Více zařízení s privátní adresou používá jednu veřejnou IP",["Přidělování IP adres podle MAC","Překlad jmen na IP","Řešení smyček ve switchích"],null],
["nat","Jak router při NAT pozná, komu uvnitř patří odpověď?","Překlad si uložil do tabulky pod náhodným portem a podle něj ho najde",["Podle MAC adresy serveru, ze kterého odpověď přišla","Nepozná to, a proto odpověď pošle všem vnitřním počítačům","Podle DNS jména, které si uložil při odchozím dotazu"],null],
["nat","Kdo musí při NAT zahájit komunikaci?","Vnitřní síť – zvenku se na počítač uvnitř spojit nejde",["Vnější server","Kdokoli, NAT to neomezuje","DNS server"],null],
["nat","Co dělá Destination NAT a kde se hlavně používá?","Mění cílovou IP/port, hlavně u veřejných WiFi hotspotů",["Mění zdrojovou IP v domácnostech","Mění MAC adresy na switchi","Šifruje provoz ve VPN"],"Source NAT mění zdrojovou IP."],
["nat","Co je maškaráda (1:N)?","Dynamický NAT – nejčastější, domácnosti a firmy",["Konkrétní vnitřní adresa má vyhrazenou veřejnou","NAT u poskytovatele","Statický překlad portů"],"NAT 1:1 = vnitřní adresa má vyhrazenou veřejnou."],
["nat","Web server na 192.168.0.50 za NAT routerem není zvenku dostupný. Co nastavíš?","PAT: předání portu na 192.168.0.50 se statickou IP",["DHCP: serveru se při startu přidělí nová adresa","STP: na switchi se zruší smyčky v síti LAN","DNS: jméno serveru se přeloží na adresu APIPA"],"Při NAT musí komunikaci zahájit vnitřní síť; PAT zpřístupní službu zvenku."],
["nat","Co je NEVÝHODOU NAT?","Těžko se blokují konkrétní vnitřní zařízení zvenku",["Šetří IPv4 adresy","Skrývá strukturu vnitřní sítě","Umožní více zařízením jednu IP"],"Další: zařízení nemají reálné spojení ven, problémy s SW, energetická náročnost."],
["nat","Je skrytí vnitřní sítě pomocí NAT zásadní zabezpečení?","Ne, není to zásadní zabezpečení",["Ano, nahrazuje firewall","Ano, ale jen u IPv6","Ano, je lepší než NGFW"],null],
["nat","Na kterých vrstvách pracují NAT a PAT?","NAT na 3., PAT na 3. a 4.",["NAT na 2., PAT na 3.","Oba jen na 7.","NAT na 4., PAT na 2."],"PAT je podmnožina NAT."],
["nat","Jak se podle přednášky liší NAT a PAT v práci s portem?","U NAT router port generuje náhodně, u PAT ho musí předem nastavit správce",["U NAT port nastavuje správce, u PAT je náhodný","Ani jeden porty nepoužívá","Oba porty jen náhodně generují"],null],
["nat","V PAT tabulce je 8080 → 192.168.0.101:8080. Kam router přepošle paket na 68.202.151.70:8080?","Na vnitřní server 192.168.0.101 (musí mít statickou IP)",["Zahodí ho","Na všechny vnitřní počítače","Zpět odesílateli"],"Nevýhoda PAT: nižší bezpečnost zpřístupněných zařízení, detailnější nastavení firewallu."],
["nat","Co je firewall?","Kontrolní bod s pravidly, který řídí provoz mezi sítěmi s různou důvěryhodností",["Switch s podporou VLAN, který odděluje porty v jedné síti","Server pro DNS, který blokuje překlad podezřelých domén","Pasivní prvek v rozvaděči, který chrání kabely před rušením"],"Historicky pravidla: zdrojová/cílová IP a port."],
["nat","Jak funguje firewall typu filtrování paketů?","Kontroluje pakety podle IP, portů a protokolů – neanalyzuje obsah",["Sleduje stav aktivních spojení","Analyzuje obsah na aplikační úrovni","Učí se pomocí AI"],"+ jednoduchý a rychlý."],
["nat","Jak funguje proxy firewall (aplikační brána)?","Je prostředník a analyzuje obsah na aplikační úrovni – zpomaluje provoz",["Kontroluje jen IP adresy a porty, obsah paketů neřeší","Učí se detekovat anomálie pomocí AI a reaguje na zero-day","Hlídá jen TCP handshake a relace, obsah neanalyzuje"],"Stavový inspekční sleduje stav spojení, obvodový hlídá TCP handshake."],
["nat","Co je NGFW?","Firewall nové generace – firewall + IDS/IPS a kontrola aplikací (drahý, složitý)",["Nejjednodušší filtr paketů podle IP adres a portů","Firewall jako služba hostovaná v cloudu (FWaaS)","Firewall pracující jen na 2. vrstvě podle MAC adres"],null],
["nat","Co je typické pro neuronový (AI) firewall?","Detekuje anomálie, učí se, reaguje i na zero-day; drahý, falešné poplachy",["Je nejlevnější a nejjednodušší, kontroluje jen IP a porty","Neanalyzuje obsah, hlídá jen TCP handshake a relace","Funguje jen v cloudu jako služba a nemá falešné poplachy"],"Pro střední firmu stovky tisíc až miliony Kč ročně. Doma stačí SW firewall."],

// ---------- KABELÁŽ (24) ----------
["kab","Co je nejčastějším zdrojem poruch v síti?","Kabely a konektory",["Routery","DNS servery","Operační systém"],"Proto se vyplatí kvalitní projekt (strukturovaná kabeláž)."],
["kab","S čím roste útlum kabelu?","S frekvencí, menším průměrem kabelu a délkou",["S větším průměrem kabelu","Jen s teplotou","S počtem připojených PC"],"Útlum určuje použitelnou délku kabelu."],
["kab","Jak se nazývá přeslech mezi souběžnými vodiči?","Crosstalk",["Jitter","Broadcast storm","Handshake"],null],
["kab","Co patří mezi ochranné pasivní prvky?","Rozvaděče (rack), záložní zdroje, ventilace, klimatizace",["Konektory RJ45, BNC a průchodky proti zlomu kabelu","Patch panely, zásuvky, lišty a spojky na kabely","Huby, repeatery a media konvertory v rozvaděči"],"Pomocné: spojky, rozdvojky, zásuvky, lišty, patch panely."],
["kab","Jak je stavěný koaxiální kabel?","Střední vodič, plastová izolace, opletení (stínění), vnější pouzdro",["4 zkroucené páry vodičů","Skleněné jádro a plášť","Dva paralelní dráty bez izolace"],null],
["kab","Tenký koax: standard, max. segment a konektor?","10BASE-2, 185 m, BNC",["10BASE-5, 500 m, AUI","10BASE-2, 500 m, RJ45","10BASE-T, 100 m, BNC"],"Tlustý: 10BASE-5, 500 m, AUI. Oba 10 Mb/s, 50 Ω, sběrnice."],
["kab","Tlustý koax („Yellow Ethernet“): standard a max. segment?","10BASE-5, 500 m",["10BASE-2, 185 m","10BASE-T, 100 m","10BASE-F, 2 km"],"Celá síť max 2 500 m (tenký 910 m)."],
["kab","Co patří na konce tenkého koaxu?","Terminátory",["Patch panely","Repeatery","RJ45 konektory"],"Potřeba: BNC, T-konektory, I-konektory (spojky), terminátory."],
["kab","Proč jsou T-konektory u tenkého koaxu problém?","Na každé odbočce se kabel přeruší, což způsobuje těžko zjistitelné poruchy",["Jsou příliš drahé, a proto se v sítích nepoužívají","Neumí přenést 10 Mb/s, takže síť zpomalují","Nefungují s BNC konektory a vyžadují AUI"],null],
["kab","Kolik párů má kroucená dvoulinka a proč jsou zkroucené?","4 páry; zkroucení potlačuje rušení a zvyšuje dosah",["2 páry; kvůli ohebnosti","8 párů; kvůli rychlosti","4 páry; kvůli nižší ceně"],"Každý pár má jinou délku zkrutu."],
["kab","Co znamená, že kroucená dvoulinka je symetrické vedení?","Obě žíly jsou rovnocenné a signál je rozdíl potenciálů mezi nimi",["Jedna žíla je zem, druhá signál","Kabel je stejně dlouhý na obou koncích","Oba konce mají stejný konektor"],null],
["kab","K čemu se používá lanko a k čemu drát?","Lanko na ohebné kabely k PC, drát na pevné rozvody v lištách",["Lanko do lišt, drát k PC","Oba jen na optiku","Lanko pro koax, drát pro UTP"],null],
["kab","Co znamená U/FTP?","Kabel nestíněný, páry stíněné fólií",["Kabel fólií, páry nestíněné","Kabel opletením, páry fólií","Nic není stíněné"],"Před lomítkem celý kabel, za lomítkem páry. U = nestíněný, F = fólie, S = opletení."],
["kab","Co znamená F/UTP?","Kabel stíněný fólií, páry nestíněné",["Kabel nestíněný, páry fólií","Kabel i páry fólií","Kabel opletením"],"Staré FTP = nové F/UTP; staré STP = nové U/FTP."],
["kab","Co znamená S/FTP?","Kabel stíněný opletením, páry fólií",["Kabel fólií, páry opletením","Nic nestíněné","Kabel fólií + opletením, páry nestíněné"],null],
["kab","Jakou rychlost a frekvenci má Cat.5e?","1 Gb/s, 100 MHz",["100 Mb/s, 100 MHz","10 Gb/s, 500 MHz","1 Gb/s, 250 MHz"],"Cat.5 = 100 Mb/s."],
["kab","Potřebuješ 10 Gb/s na 80 m s běžným RJ45 a doporučovanou kategorií. Co zvolíš?","Cat.6A",["Cat.5E","Cat.7","Cat.8"],"Cat.5E má 1 Gb/s, Cat.7 se nedoporučuje a má nestandardní konektory, Cat.8 má dosah jen 30 m."],
["kab","Jakou rychlost a max. délku mají Cat.8 a Cat.8a?","Cat.8 25 Gb/s, Cat.8a 40 Gb/s – obě jen 30 m",["Obě 40 Gb/s na 100 m","Cat.8 10 Gb/s, Cat.8a 15 Gb/s na 100 m","Obě 100 Gb/s na 10 m"],null],
["kab","Proč je Cat.6 „slepá kolej“?","Chybí limit pro Alien Crosstalk, výkonem odpovídá Cat.5E",["Je příliš drahá na výrobu a instalaci do lišt","Má maximální délku jen 30 m jako Cat.8","Nepoužívá konektor RJ45, ale nestandardní GG45"],"Alien Crosstalk = přeslech mezi sousedními kabely ve svazku a porty. 2006: Cat.6A (ISO/IEC 11801)."],
["kab","Jakou kabeláž přednáška doporučuje?","Běžně Cat.5E, pro náročné Cat.6A (případně Cat.8)",["Vždy Cat.6, protože je spolehlivější pro Gigabit než Cat.5E","Vždy Cat.7, protože má nejvyšší šířku pásma 600 MHz","Cat.3 pro domácnosti a Cat.6 pro firmy a páteřní sítě"],"Cat.6 a Cat.7 se nedoporučují. Výkon se dnes hodnotí přenosovou rychlostí, ne šířkou pásma."],
["kab","Kolik kontaktů má RJ45 a k čemu je RJ11?","RJ45 8 kontaktů; RJ11 telefon (6 kontaktů, 2 nevyužité)",["RJ45 4 kontakty; RJ11 data","RJ45 6 kontaktů; RJ11 optika","RJ45 10 kontaktů; RJ11 koax"],"RJ10 (4 kontakty) = sluchátko telefonu. Pro Cat.7 konektory GG45 a TERA."],
["kab","Zákazník potřebuje levnou kabeláž pro gigabitovou LAN. Co podle přednášky nabídnout?","Cat.5E – 1 Gb/s garantuje norma",["Cat.6 – vyšší šířka pásma je spolehlivější","Cat.7 – výkonem je nejlepší pro Gigabit","Cat.5 – pro Gigabit je certifikovaná"],"Argument o vyšší spolehlivosti Cat.6 je podle přednášky zavádějící."],
["kab","Propojuješ počítač se switchem. Jaký kabel použiješ?","Přímý – oba konce zapojené stejně",["Křížený – jeden konec T568A, druhý T568B","Koaxiální kabel s terminátory na koncích","Telefonní kabel s konektorem RJ11"],"Křížený se používá pro PC ↔ PC a switch ↔ switch."],
["kab","Co je křížený kabel a k čemu je?","Jeden konec T568A, druhý T568B – PC ↔ PC, switch ↔ switch",["Oba konce zapojené podle T568B – mezi PC a switchem","Kabel s BNC konektory a terminátory pro koaxiální síť","Kabel s jediným párem vodičů pro telefonní linku"],"Prohodí se zelený a oranžový pár. Přímý = oba konce stejně (B–B), PC ↔ switch."],

// ---------- OPTIKA (12) ----------
["opt","Co je optické vlákno a díky čemu v něm světlo drží?","Nevodivý vlnovod; úplný odraz na rozhraní dvou prostředí",["Měděný vodič; magnetické pole","Kroucený pár; stínění","Rádiová anténa; odraz od ionosféry"],"Snellův zákon lomu: při malém úhlu dopadu se paprsek odrazí celý."],
["opt","Jednovidové vlákno (SMF): průměr a zdroj světla?","9/125 μm (8,5/125), laser",["50/125 μm, LED","62,5/125 μm, LED","9/125 μm, LED"],"Jediný mód, minimální disperze, dlouhé dosahy, WDM."],
["opt","Mnohovidové vlákno (MMF): průměr a zdroj světla?","50/125 nebo 62,5/125 μm, LED nebo VCSEL 850 nm",["9/125 μm, výhradně laser pro dlouhé trasy","8,5/125 μm, laser a vlnový multiplex DWDM","125/250 μm, halogenová žárovka nebo výbojka"],"Levnější, kratší dosah – datacentra, kampus. 62,5/125 hlavně v USA."],
["opt","Jaký je klíčový parametr optiky a jakou má hodnotu u křemíku?","Útlum, kolem 0,2 dB/km",["Odpor, 50 Ω","Útlum, 50–100 dB/km","Frekvence, 100 MHz"],"Plastová vlákna 50–100 dB/km. Nad 1 700 nm se nepoužívají."],
["opt","Mezi dvěma městy vede trasa 40 km. Jaké vlákno a zdroj světla zvolíš?","Jednovidové (SMF) s laserem",["Mnohovidové (MMF) s LED diodou","Mnohovidové 62,5/125 μm s VCSEL","Plastové vlákno s LED diodou"],"MMF je ekonomická volba pro krátké linky, SMF má dlouhé dosahy."],
["opt","Proč se vždy pokládá víc optických vláken, než je potřeba?","Kabel (50–300 Kč/m) je levný proti pokládce a aktivním prvkům",["Protože vlákna se po pár letech přirozeně kazí","Protože to přímo vyžaduje norma ISO/IEC 11801","Protože každé vlákno přenese jen jednu službu"],null],
["opt","Co umožňuje vlnový multiplex (WDM/DWDM)?","Přenos víc „barev“ (vlnových délek) jedním vláknem",["Přenos elektřiny po vlákně","Převod světla na rádio","Šifrování dat"],null],
["opt","Jak se jmenují sloty pro optiku v routerech?","SFP",["RJ45","BNC","AUI"],null],
["opt","Kde roste význam optiky?","V páteřních sítích MAN a WAN",["V lokálních sítích LAN","V připojení domácích PC","V rozvodech uvnitř kanceláří"],"V LAN význam klesá kvůli bezdrátu."],
["opt","Proč se plastová vlákna nehodí na dlouhé trasy?","Mají útlum 50–100 dB/km, křemík jen kolem 0,2 dB/km",["Mají útlum kolem 0,2 dB/km, křemík 50–100 dB/km","Neumí přenášet světlo z LED diod ani z laseru","Jsou citlivá na elektromagnetické rušení z okolí"],null],
["opt","Co NENÍ výhodou optiky?","Levné konvertory",["Obrovská šířka pásma","Odolnost proti EM rušení a elektrická izolace","Bezpečnost přenosu (státní správa, banky)"],null],
["opt","Co je potřeba k přenosu po optice kromě vlákna?","Vysílač se zdrojem světla a detektor s přijímačem",["Jen konektor RJ45 a obyčejný switch v síti","Anténa s přímou viditelností a licence od ČTU","BNC konektory a terminátory na obou koncích"],null],

// ---------- BEZDRÁT (17) ----------
["wif","Jaké jsou vlastnosti bezdrátových přenosů?","Postaví se rychle a na velké vzdálenosti, ale jsou méně spolehlivé a méně bezpečné",["Jsou spolehlivější i bezpečnější než kabelové rozvody","Dají se postavit jen na krátké vzdálenosti uvnitř budov","Vždy vyžadují licenci od ČTU a nízké investice"],null],
["wif","Jaký frekvenční rozsah má rádiová a jaký mikrovlnná komunikace?","Rádiová 30 Hz – 1 GHz, mikrovlnná 1 – ~100 GHz",["Rádiová 1–100 GHz, mikrovlnná 30 Hz – 1 GHz","Obě 2,4 GHz","Rádiová nad 100 GHz, mikrovlnná pod 1 MHz"],null],
["wif","Jak se šíří mikrovlny?","Přímočaře, směrové antény, potřeba přímé viditelnosti (retranslační stanice)",["Všesměrově a dobře procházejí překážkami","Jen po kabelu","Odrazem od ionosféry"],"Použití: WiFi, 5G, GSM, satelity. Rádio: AM/FM, vysílačky, IoT."],
["wif","Co platí o nelicencovaném pásmu (WiFi)?","Nevyžaduje povolení ČTU, je zdarma, ale kanál ti nikdo nezaručí",["Přiděluje ho ČTU a garantuje ochranu","Je placené a chráněné","Nesmí ho používat domácnosti"],"Rušení omezí směrové antény (pozor na Fresnelovu zónu)."],
["wif","Proč má 2,4 GHz problém se stromy a dřevem?","Vlnu (~12,5 cm) z 95 % pohltí voda a organické látky",["Protože je moc krátká (~1 mm)","Protože ji odráží kov","Protože vyžaduje licenci"],"5 GHz: vlna ~6 cm, voda ji pohlcuje méně."],
["wif","Co platí o pásmu 6 GHz?","Nové pásmo (5,925–7,125 GHz), kanály se nepřekrývají – nezaměňovat s WiFi 6",["Je to totéž co obchodní označení WiFi 6 (802.11ax)","Používá se jen pro rozhlasové vysílání AM/FM","Je licencované a přiděluje ho ČTU konkrétním firmám"],null],
["wif","Co platí o pásmu 10 GHz?","Jen spoje bod–bod, až 34 Mb/s, dosah až 40 km",["Všesměrová WiFi pro domácnosti","Jen sítě s centrálním uzlem a klienty","Bod–bod, až 622 Mb/s, dosah 5 km"],null],
["wif","Jaká je reálná přenosová rychlost WiFi proti nominální?","Podle vzorkovacího teorému minimálně poloviční",["Vždy dvojnásobná díky kompresi dat v routeru","Přesně stejná, pokud není v dosahu jiná síť","Desetinová kvůli rušení od sousedních sítí"],null],
["wif","Jaký standard je WiFi 6 a WiFi 7?","WiFi 6 = 802.11ax, WiFi 7 = 802.11be",["WiFi 6 = 802.11ac, WiFi 7 = 802.11ax","WiFi 6 = 802.11be, WiFi 7 = 802.11ax","WiFi 6 = 802.11n, WiFi 7 = 802.11ac"],"WiFi 5 = 802.11ac, WiFi 6E = 802.11ax + 6 GHz."],
["wif","Co přinesla WiFi 7?","Kanál 320 MHz, 4096 QAM, MLO, Multi-RU, puncturing",["Povinných 40 MHz a 256 QAM","Jen pásmo 2,4 GHz","WPA2 a 64 QAM"],"Až 46 120 Mb/s, rok 2024, ~13× rychlejší než WiFi 5."],
["wif","Jaké zabezpečení a modulaci má WiFi 6?","WPA3, 1024 QAM",["WPA2, 256 QAM","WPA4, 4096 QAM","WEP, 64 QAM"],"Novinky WiFi 6: TWT, BSS coloring, beamforming."],
["wif","Co je WiFi MESH?","Víc bezdrátově propojených prvků, které se tváří jako jeden router (jedna síť, název, heslo)",["Síť bez hesla, ke které se může připojit kdokoli","Kabelová síť propojená huby do hvězdy","Licencovaný bodový spoj, který přiděluje ČTU"],"Klient se připojí na prvek s nejlepším signálem."],
["wif","Jaká je základní bezpečnostní zásada u WiFi?","Změnit výchozí nastavení zařízení",["Nechat tovární heslo","Vypnout šifrování","Používat jen 2,4 GHz"],"Připojit se může kdokoli odkudkoli."],
["wif","Co platí o licencovaném pásmu?","Přiděluje ČTU, frekvence je chráněná; až 622 Mb/s, dosah ~50 km",["Je zdarma bez povolení","Kapacita klesá s počtem klientů jako u WiFi","Dosah max 100 m"],"Pásma 3,5 GHz a 7,5–38 GHz. Kapacitu nesnižuje počet klientů ani malé pakety."],
["wif","Co je FSO a jaký je jeho největší nepřítel?","Laser/LED vzduchem bod–bod do ~5 km; hustá mlha",["WiFi v pásmu 6 GHz; největší nepřítel je déšť","Optické vlákno v zemi; největší nepřítel je ohyb","Rádiový spoj ČTU; největší nepřítel je sníh"],"Déšť ani sníh nevadí. Řeší se rádiovou zálohou → dostupnost 99,999 %."],
["wif","Dvě budovy 1 km od sebe mají přímou viditelnost, v lokalitě bývá hustá mlha. Co zvolíš?","FSO s automatickou rádiovou zálohou",["Samotné FSO, protože mlha mu nevadí","Tenký koax 10BASE-2 mezi budovami","WiFi MESH bez přímé viditelnosti"],"Mlha je největší nepřítel FSO; s rádiovou zálohou dostupnost 99,999 %."],
["wif","Co je VLC a co LiFi?","VLC = data ve viditelném světle z LED (simplex); LiFi = LED bliká tak rychle, že to oko nevidí",["VLC je standard WiFi 7; LiFi je označení sítě 5G","VLC je optické vlákno; LiFi je typ koaxiálního kabelu","Obě jsou licencovaná rádiová pásma, která přiděluje ČTU"],"LiFi: bez EM rušení, nízká spotřeba, bezpečná komunikace."],
],

  learn: `
    <div class="lc" id="L-zak"><h2>1 · Základní pojmy</h2>
      <h3>Co je počítačová síť</h3><ul>
      <li><b>Síť</b> = propojení několika <b>uzlů</b> (nodes, stanic), které spolu komunikují.</li>
      <li>Technicky ji tvoří <b>přenosové médium</b>, <b>síťová karta (NIC)</b> a další komponenty.</li>
      <li>Umožňuje přenos dat a služby, například sdílení disků nebo tisk.</li>
      <li class="hl">Funkční počítač = HW + operační systém. <b>Funkční síť = HW + komunikační protokol.</b></li></ul>
      <h3>Jak se data přenáší</h3><ul>
      <li><b>Pakety</b> – data se dělí na malé části, aby neucpala síť.</li>
      <li><b>Adresy</b> – odesílatel i adresát musí být určeni jednoznačně.</li>
      <li><b>Protokol</b> – univerzální pravidla, podle kterých přenos probíhá.</li>
      <li><b>Požadavky:</b> množství, rychlost, spolehlivost, univerzálnost.</li>
      <li><b>Limity:</b> rychlost média, různorodost, množství služeb, spolehlivost a bezpečnost.</li></ul>
      <h3>Přenosový protokol</h3><ul>
      <li>Je to <b>předpis (software)</b> pro navázání spojení a přenos dat. Dělí se do <b>hierarchických vrstev</b> a nezávisí na implementaci.</li>
      <li>Umí: detekovat okolní zařízení, nastavit atributy, poznat začátek a konec paketu, určit formát paketu, najít a opravit chyby, ukončit komunikaci.</li></ul>
      <div class="cmp"><div><strong>IPX/SPX</strong><p>Adresuje <b>MAC adresami</b> (sítě Novell). Je rychlý, protože cesta je předem známá. Funguje <b>jen v LAN</b> a dnes je na ústupu.</p></div>
      <div><strong>TCP/IP</strong><p>Adresuje <b>IP adresami</b> a <b>hledá trasu</b>. Je univerzální, běží na něm celý Internet. Jde o celou „rodinu protokolů“.</p></div></div>
      <ul><li class="hl"><b>Přenosový</b> protokol (IP, IPX) přenese data sítí. <b>Aplikační</b> protokol (HTTP, DNS…) je předá konkrétní aplikaci.</li></ul></div>

    <div class="lc" id="L-osi"><h2>2 · OSI vs TCP/IP, TCP vs UDP</h2>
      <h3>Vrstvy</h3>
      <table class="lt"><tr><th>Vrstva OSI</th><th>Co dělá</th><th>Prvek</th><th>TCP/IP</th></tr>
      <tr><td>7&nbsp;Aplikační<small>data</small></td><td>služby pro aplikace</td><td></td><td rowspan="3">Aplikační</td></tr>
      <tr><td>6&nbsp;Prezentační<small>data</small></td><td>formát, kódování, šifrování</td><td></td></tr>
      <tr><td>5&nbsp;Relační<small>data</small></td><td>řízení relace</td><td></td></tr>
      <tr><td>4&nbsp;Transportní<small>segment</small></td><td>doručení, řízení toku, <b>porty</b></td><td>TCP, UDP</td><td>Transportní</td></tr>
      <tr><td>3&nbsp;Síťová<small>paket</small></td><td><b>IP</b>, směrování</td><td><b>router</b></td><td>Síťová</td></tr>
      <tr><td>2&nbsp;Linková<small>rámec</small></td><td><b>MAC</b>, rámce, CRC</td><td><b>switch</b>, NIC</td><td rowspan="2">Síťové rozhraní</td></tr>
      <tr><td>1&nbsp;Fyzická<small>bity</small></td><td>signál, médium</td><td><b>hub</b>, repeater</td></tr></table>
      <ul><li><b>Síťové rozhraní:</b> přístup k fyzickému médiu (Ethernet, Token Ring, FDDI).</li>
      <li><b>Síťová vrstva:</b> adresace a směrování (IP, ARP, RARP, ICMP, IGMP, IGRP, IPSEC). Je <b>ve všech prvcích sítě</b>.</li>
      <li><b>Transportní vrstva:</b> je <b>jen v koncových zařízeních</b>, přizpůsobuje síť potřebám aplikace.</li>
      <li><b>Aplikační vrstva:</b> programy, které síť využívají (Telnet, FTP, HTTP, DHCP, DNS).</li></ul>
      <h3>TCP nebo UDP</h3>
      <div class="cmp"><div class="yes"><strong>TCP – spolehlivý</strong><p><b>Naváže spojení</b>, posílá data <b>po menších částech</b>, příjem <b>potvrzuje</b> a hlídá <b>pořadí</b>.</p><p>Použití: <b>WWW, e-mail, SSH</b>.</p></div>
      <div class="no"><strong>UDP – jednoduchý</strong><p><b>Bez spojení</b>, celý blok v jednom datagramu. Data se mohou <b>ztratit, přehodit nebo dojít víckrát</b>.</p><p>Použití: <b>DNS, DHCP, VoIP, online hry</b>.</p></div></div>
      <ul><li><b>Port</b> = domluvené číslo, které na jednom počítači rozliší aplikace.</li>
      <li class="hl">Síťové spojení aplikace je určeno kombinací <b>IP adresa + port + transportní protokol</b>. DNS používá TCP i UDP.</li></ul></div>

    <div class="lc" id="L-pro"><h2>3 · Aplikační protokoly</h2>
      <h3>Adresy a web</h3><div class="grid2">
      <div><b>DNS</b> překládá doménová jména na IP adresy</div><div><b>DHCP</b> automaticky přiděluje IP adresy</div>
      <div><b>HTTP</b> přenáší webové stránky (WWW)</div><div><b>WebDAV</b> rozšiřuje HTTP o práci se soubory</div></div>
      <h3>Soubory</h3><div class="grid2">
      <div><b>FTP</b> přenos souborů po síti</div><div><b>TFTP</b> jednoduchý přenos souborů</div>
      <div><b>SMB</b> sdílení souborů a tiskáren ve Windows</div><div><b>NFS</b> sdílení vzdálených souborů, jako by byly lokální (Unix)</div></div>
      <h3>Pošta</h3><div class="grid2">
      <div><b>SMTP</b> odesílání e-mailů</div><div><b>POP3</b> stažení pošty ze serveru</div>
      <div><b>IMAP</b> práce se zprávami přímo na serveru</div></div>
      <h3>Správa a přístup</h3><div class="grid2">
      <div><b>Telnet</b> vzdálený terminál, nezabezpečený</div><div><b>SSH</b> vzdálený terminál, <b>zabezpečený</b></div>
      <div><b>SNMP</b> správa síťových zařízení</div><div><b>NTP</b> synchronizace přesného času</div>
      <div><b>NTLM</b> ověřování (autentizace) ve Windows</div><div><b>X11</b> zobrazení oken grafických programů v Unixu</div></div>
      <h3>Komunikace</h3><div class="grid2">
      <div><b>XMPP</b> zprávy a sledování přítomnosti (Jabber)</div><div><b>IRC</b> jednoduchý chat po Internetu</div>
      <div><b>NNTP</b> čtení a vkládání zpráv typu news</div></div></div>

    <div class="lc" id="L-adr"><h2>4 · Adresace</h2>
      <table class="lt"><tr><th></th><th>MAC</th><th>IPv4</th><th>IPv6</th></tr>
      <tr><td>Typ</td><td>fyzická (karta)</td><td>logická</td><td>logická</td></tr>
      <tr><td>Bitů</td><td><b>48</b></td><td><b>32</b></td><td><b>128</b></td></tr>
      <tr><td>Počet</td><td>≈2,8×10¹⁴</td><td>≈4×10⁹</td><td>≈3×10³⁸</td></tr>
      <tr><td>Zápis</td><td>A0-48-1C-92-DB-CF</td><td>192.168.0.1</td><td>8× 4 hexa</td></tr></table>
      <ul><li class="hl"><b>Hlavní pravidlo:</b> v jednom okamžiku nesmí být v síti dva uzly se stejnou adresou.</li>
      <li>Jedno rozhraní může mít <b>více IP adres</b>, ale stejná IP nesmí být na více rozhraních.</li></ul>
      <h3>K čemu je MAC adresa</h3><ul>
      <li>Je teoreticky neměnná, prakticky ji změnit jde.</li>
      <li>Slouží pro <b>přeskok mezi sousedními uzly</b>, identifikaci zařízení pro <b>DHCP</b>, <b>filtrování a firewall</b> a ověření připojení (WiFi).</li>
      <li><b>Proč tedy IP, když má MAC víc kombinací?</b> MAC není hierarchická, takže podle ní nejde hledat cestu mezi sítěmi.</li></ul>
      <h3>Veřejné a privátní adresy</h3><ul>
      <li class="hl">Privátní rozsahy: <b>10.0.0.0–10.255.255.255</b> · <b>172.16.0.0–172.31.255.255</b> · <b>192.168.0.0–192.168.255.255</b>. Všechno ostatní je veřejné.</li>
      <li><b>Veřejná IP</b> je dostupná z celého Internetu, proto potřebuje kvalitní <b>firewall</b>.</li>
      <li><b>Privátní IP</b> je jen pro vnitřní síť, od Internetu ji odděluje <b>NAT router</b>.</li>
      <li>Paket s privátním odesílatelem se na veřejné síti <b>okamžitě zahodí</b>. Ven musí jít <b>přes bránu (NAT)</b>.</li>
      <li>Pakety z adres mimo vnitřní rozsah (masku) se <b>ignorují</b>.</li></ul>
      <h3>Nedostatek IPv4 a APIPA</h3><ul>
      <li><b>DHCP, subnetting/CIDR a NAT/PAT</b> nedostatek jen zmírňují. Skutečné řešení je <b>IPv6</b>.</li>
      <li><b>APIPA 169.254.x.x</b> (rozsah třídy B) si zařízení přidělí samo, když <b>nedostane adresu z DHCP</b>. Fungují jen lokální služby, ven se nedostane. DHCP dál hledá <b>každé 3 minuty</b>.</li></ul></div>

    <div class="lc" id="L-msk"><h2>5 · Maska, brána, subnetting, DHCP</h2>
      <ul><li>Každé zařízení potřebuje: <b>IP adresu, masku, bránu, adresu DHCP a adresu DNS</b>.</li></ul>
      <h3>Maska a brána</h3><ul>
      <li><b>Maska</b> má 32 bitů a určuje rozsah vnitřní sítě: <b>jedničky = síť, nuly = počítač</b>.</li>
      <li>Zařízení v jedné síti musí mít <b>stejnou masku a stejné první bity IP adresy</b>, jinak spolu nekomunikují ani při fyzickém propojení.</li>
      <li>Příklad: 10.10.10.x a 10.10.<b>11</b>.x s maskou /24 jsou <b>různé sítě</b>, komunikace musí jít přes <b>router</b>.</li>
      <li><b>Brána</b> = adresa routeru, přes který jdou všechny požadavky mimo domácí síť. Bývá stejná pro celou síť a zvykem je <b>.1</b> na konci.</li></ul>
      <h3>Subnetting</h3><ul>
      <li>Každý „půjčený“ bit dá <b>2× víc podsítí o poloviční velikosti</b>.</li>
      <li class="hl">Velikost podsítě = <b>256 − poslední oktet masky</b>. Použitelné adresy = <b>velikost − 2</b> (první je adresa sítě, poslední broadcast).</li></ul>
      <table class="lt"><tr><th>Prefix</th><th>Maska</th><th>Adres</th><th>Použit.</th><th>Podsítí z /24</th></tr>
      <tr><td>/24</td><td>.0</td><td>256</td><td>254</td><td>1</td></tr><tr><td>/25</td><td>.128</td><td>128</td><td>126</td><td>2</td></tr>
      <tr><td>/26</td><td>.192</td><td>64</td><td>62</td><td>4</td></tr><tr><td>/27</td><td>.224</td><td>32</td><td>30</td><td>8</td></tr>
      <tr><td>/28</td><td>.240</td><td>16</td><td>14</td><td>16</td></tr><tr><td>/29</td><td>.248</td><td>8</td><td>6</td><td>32</td></tr>
      <tr><td>/30</td><td>.252</td><td>4</td><td>2</td><td>64</td></tr></table>
      <ul><li>Příklad: 192.168.1.0/24 na 4 podsítě = <b>/26</b>, rozsahy .0–63, .64–127, .128–191, .192–255.</li></ul>
      <h3>DHCP</h3><ul>
      <li>DHCP server pozná zařízení podle <b>MAC adresy</b> a přidělí mu IP z nastaveného rozsahu.</li>
      <li><b>Dynamicky</b> dostávají adresy pracovní stanice, <b>staticky</b> servery, routery a switche. Ruční nastavení má být výjimka.</li></ul></div>

    <div class="lc" id="L-dns"><h2>6 · DNS a URL</h2>
      <h3>DNS</h3><ul>
      <li>Kromě MAC rozlišujeme adresy <b>IP, DNS a URL</b>. DNS má tvar jméno.doména…doména, <b>nejvyšší doména je vpravo</b>.</li>
      <li>TCP/IP jména „neumí“, v paketu jsou jen IP adresy. <b>DNS server překládá jméno na IP</b> a odkazují na něj DNS servery vyšších domén.</li>
      <li>Přístup přes jméno je <b>vždy pomalejší</b> (dotaz navíc) a může být méně spolehlivý, proto má oblast <b>více DNS serverů</b>.</li>
      <li>Čísla v IP adrese <b>neodpovídají doménám</b>, žádný přímý vztah mezi nimi není.</li>
      <li class="hl"><b>Napadené DNS</b> vrací jiné adresy a pošle uživatele na podvodné stránky. Používej zabezpečené DNS: Cloudflare <b>1.1.1.1</b>, Google <b>8.8.8.8</b>, evropské <b>86.54.11.1</b>.</li></ul>
      <h3>URL</h3><ul>
      <li>Vznikla, aby jeden počítač (jedna IP) mohl nabízet <b>více služeb</b>. Je nezbytná pro <b>WWW</b>.</li>
      <li>Jako jediná určí <b>server, protokol, jméno a heslo, port i cestu k souboru</b>.</li>
      <li class="hl"><code>protokol://[jméno[:heslo]@]server[:port][cesta]</code></li></ul></div>

    <div class="lc" id="L-prv"><h2>7 · Aktivní a pasivní prvky</h2>
      <div class="cmp"><div><strong>Pasivní prvky</strong><p><b>Jen přenášejí</b> paket: kabely, zásuvky, konektory, patch panely, rozvaděče.</p></div>
      <div><strong>Aktivní prvky</strong><p><b>Mění chování</b> paketu: hub, switch, router, repeater, media konvertor, firewall.</p></div></div>
      <table class="lt"><tr><th>Prvek</th><th>OSI</th><th>Co dělá</th></tr>
      <tr><td><b>HUB</b></td><td>1</td><td>obnoví signál a pošle ho <b>všemi porty</b>, provoz neřídí; zpoždění jen 1 bit</td></tr>
      <tr><td><b>SWITCH</b></td><td>2</td><td>pošle data <b>jen na port adresáta</b> podle MAC; médium není sdílené</td></tr>
      <tr><td><b>ROUTER</b></td><td>3</td><td><b>spojuje alespoň 2 sítě</b> a přenáší mezi nimi data podle IP</td></tr>
      <tr><td><b>REPEATER</b></td><td>1</td><td>poškozený signál opraví a zesílí, tím <b>prodlouží dosah</b></td></tr>
      <tr><td>MODEM</td><td>–</td><td>media konvertor: převede médium a většinou analog na digitál (DSL)</td></tr>
      <tr><td>WiFi</td><td>–</td><td>převede signál z UTP na rádio (2,4 / 5 / 10 / 60 GHz)</td></tr>
      <tr><td>LiFi</td><td>–</td><td>převede signál na světlo šířené vzduchem</td></tr>
      <tr><td>PowerLine</td><td>–</td><td>přenáší data po rozvodech 230 V</td></tr></table>
      <ul><li class="hl">Hub, switch, repeater a WiFi fungují <b>v rámci LAN</b>. Pouze <b>router propojuje sítě</b>.</li>
      <li><b>Limit hubů:</b> síť 10 Mb/s max. 5 segmentů (4 huby), síť 100 Mb/s max. 3 segmenty (2 huby).</li>
      <li><b>Managovatelný switch</b> umí QoS, shaping a VLAN.</li>
      <li><b>„Jednoruký“ router</b> směruje mezi VLAN na jediném portu.</li>
      <li>V <b>mobilních ad-hoc sítích</b> si každý počítač routuje sám.</li></ul></div>

    <div class="lc" id="L-nat"><h2>8 · Služby: switch, router, NAT, PAT, firewall</h2>
      <h3>Služby switche (2. vrstva)</h3><ul>
      <li><b>Backward Learning:</b> pamatuje si, na kterém portu je která MAC. Neznámý cíl pošle všem, chová se jako hub.</li>
      <li><b>Spanning Tree (STP):</b> řeší smyčky v síti a brání <b>broadcast storm</b>. Nevýhodou je pomalost.</li>
      <li>Případně: vzdálený <b>management</b>, <b>VLAN</b> (virtuální sítě), <b>SNMP</b> (správa a hlášení stavů).</li></ul>
      <h3>Služby routeru (3. vrstva)</h3><ul>
      <li><b>Routing:</b> určuje cestu paketů podle routovacích tabulek.</li>
      <li><b>Shaping (QoS):</b> omezuje rychlost klientů.</li>
      <li><b>VPN:</b> šifrovaný kanál přes nezabezpečené médium.</li>
      <li>Dále <b>DNS, DHCP, management, NAT, PAT a firewall</b>.</li></ul>
      <h3>NAT a PAT</h3><ul>
      <li><b>NAT:</b> více zařízení s privátní adresou používá <b>jednu veřejnou IP</b>. Router si překlad uloží do tabulky pod <b>náhodným portem</b> a podle něj vrátí odpověď správnému počítači.</li>
      <li class="hl">Komunikaci musí zahájit <b>vnitřní síť</b>, zvenku se na počítač uvnitř přes NAT spojit nejde.</li>
      <li><b>Výhody:</b> šetří IPv4 adresy a skrývá vnitřní síť, ale <b>není to zásadní zabezpečení</b>.</li>
      <li><b>Nevýhody:</b> zařízení nemají reálné spojení ven, těžko se blokují zvenku, problémy s některým SW, vyšší spotřeba.</li>
      <li><b>Typy:</b> Source (mění zdrojovou IP) · Destination (mění cíl, hotspoty) · <b>Maškaráda 1:N</b> (nejčastější, domácnosti a firmy) · 1:1 (vyhrazená veřejná adresa) · CGNAT/NAT444 (překlad i uvnitř sítě poskytovatele, 100.64.0.0/10).</li>
      <li><b>PAT:</b> podmnožina NAT, pracuje na <b>3. a 4. vrstvě</b> (NAT jen na 3.). Port <b>předem nastaví správce</b>, například 8080 → 192.168.0.101:8080. Cílový server potřebuje <b>statickou IP</b>.</li></ul>
      <h3>Firewall</h3><ul>
      <li>Kontrolní bod s pravidly, který řídí provoz <b>mezi sítěmi s různou důvěryhodností</b>. Doma stačí softwarový, ve firmě se zvažuje hardwarový.</li></ul>
      <table class="lt"><tr><th>Typ</th><th>Co kontroluje</th><th>Plus / mínus</th></tr>
      <tr><td>Filtrování paketů</td><td>IP, porty, protokoly</td><td>rychlý / neanalyzuje obsah</td></tr>
      <tr><td>Stavový</td><td>stav aktivních spojení</td><td>bere kontext / náročnější</td></tr>
      <tr><td>Proxy</td><td>obsah na aplikační úrovni</td><td>hlubší analýza / zpomaluje</td></tr>
      <tr><td>NGFW</td><td>firewall + IDS/IPS + aplikace</td><td>komplexní / drahý, složitý</td></tr>
      <tr><td>Obvodový</td><td>TCP handshake a relace</td><td>rychlý / neanalyzuje obsah</td></tr>
      <tr><td>Neuronový (AI)</td><td>anomálie, i zero-day útoky</td><td>proaktivní / drahý, falešné poplachy</td></tr>
      <tr><td>Cloud (FWaaS)</td><td>služba v cloudu</td><td>levný start / závislost na konektivitě, poplatky</td></tr></table>
      <ul><li><b>Bezpečnostní politika</b> = pravidla komunikace a k tomu NAT, VPN, IDS, autentizace a správa šířky pásma.</li></ul></div>

    <div class="lc" id="L-kab"><h2>9 · Kabeláž</h2>
      <ul><li class="hl"><b>Kabely a konektory jsou nejčastější zdroj poruch.</b> Vyplatí se kvalitní projekt (strukturovaná kabeláž).</li>
      <li><b>Útlum</b> (zeslabení signálu) roste s <b>frekvencí</b>, s <b>menším průměrem</b> kabelu a s <b>délkou</b>.</li>
      <li><b>Crosstalk (přeslech)</b> = signál jednoho vodiče ruší signál v jiném.</li>
      <li><b>Pasivní prvky:</b> ochranné jsou rozvaděče, záložní zdroje a ventilace; pomocné jsou spojky, zásuvky, lišty a patch panely.</li></ul>
      <h3>Koaxiální kabel (10 Mb/s, 50 Ω, sběrnice)</h3>
      <table class="lt"><tr><th></th><th>Tenký koax</th><th>Tlustý koax</th></tr>
      <tr><td>Standard</td><td><b>10BASE-2</b> (RG-58)</td><td><b>10BASE-5</b> („Yellow“)</td></tr>
      <tr><td>Segment / síť</td><td><b>185 m</b> / 910 m</td><td><b>500 m</b> / 2 500 m</td></tr>
      <tr><td>Konektor</td><td><b>BNC</b> + T, I, terminátory</td><td><b>AUI</b></td></tr></table>
      <ul><li>Tvoří ho vodič, plastová izolace, stínění opletením a vnější pouzdro.</li>
      <li>U tenkého se na každé odbočce kabel přeruší <b>T-konektorem</b>, což způsobuje těžko zjistitelné poruchy.</li></ul>
      <h3>Kroucená dvoulinka</h3><ul>
      <li><b>4 páry</b> vodičů. <b>Zkroucení potlačuje rušení</b> a zvyšuje dosah, každý pár má jinou délku zkrutu.</li>
      <li><b>Symetrické vedení:</b> obě žíly jsou rovnocenné a signál je rozdíl potenciálů mezi nimi.</li>
      <li><b>Lanko</b> je ohebné, na kabely k PC. <b>Drát</b> je na pevné rozvody v lištách.</li>
      <li><b>Značení X/YTP:</b> před lomítkem stínění kabelu, za lomítkem stínění párů. <b>U</b> = nestíněný, <b>F</b> = fólie, <b>S</b> = opletení. Staré STP = U/FTP, staré FTP = F/UTP.</li></ul>
      <table class="lt"><tr><th>Cat</th><th>Rychlost</th><th>MHz</th><th>Délka</th></tr>
      <tr><td>5</td><td>100 Mb/s</td><td>100</td><td>100 m</td></tr><tr class="g"><td>5e ✓</td><td>1 Gb/s</td><td>100</td><td>100 m</td></tr>
      <tr class="r"><td>6 ✗</td><td>1 Gb/s</td><td>250</td><td>100 m</td></tr><tr class="g"><td>6a ✓</td><td>10 Gb/s</td><td>500–625</td><td>100 m</td></tr>
      <tr class="r"><td>7 ✗</td><td>10 Gb/s</td><td>600</td><td>100 m</td></tr><tr><td>7a</td><td>15 Gb/s</td><td>1000</td><td>100 m</td></tr>
      <tr><td>8</td><td>25 Gb/s</td><td>2000</td><td><b>30 m</b></td></tr><tr><td>8a</td><td>40 Gb/s</td><td>2000</td><td><b>30 m</b></td></tr></table>
      <ul><li class="hl"><b>Doporučení:</b> běžně <b>Cat.5E</b>, pro náročné <b>Cat.6A</b>, případně Cat.8. Cat.6 a Cat.7 se nedoporučují.</li>
      <li>Cat.6 a 7 jsou slepá kolej, protože jim chybí limit pro <b>Alien Crosstalk</b> (přeslech mezi sousedními kabely ve svazku). Proto v roce 2006 vznikla Cat.6A a výkon se hodnotí <b>přenosovou rychlostí</b>.</li></ul>
      <h3>Konektory a zapojení</h3><ul>
      <li><b>RJ45</b> má 8 kontaktů. <b>RJ11</b> je pro telefon (6 kontaktů, 2 nevyužité). <b>RJ10</b> je pro sluchátko (4 kontakty).</li>
      <li><b>Přímý kabel</b> (oba konce stejně): PC ↔ switch.</li>
      <li><b>Křížený kabel</b> (T568A na T568B): PC ↔ PC a switch ↔ switch.</li>
      <li>T568B: <span class="pin w o">b-oranž</span> <span class="pin o">oranž</span> <span class="pin w g">b-zel</span> <span class="pin b">modrá</span> <span class="pin w b">b-modrá</span> <span class="pin g">zelená</span> <span class="pin w h">b-hnědá</span> <span class="pin h">hnědá</span>. T568A má prohozený zelený a oranžový pár.</li></ul></div>

    <div class="lc" id="L-opt"><h2>10 · Optika</h2>
      <ul><li><b>Optické vlákno</b> je nevodivý vlnovod. Světlo v něm drží <b>úplný odraz</b> na rozhraní dvou prostředí (Snellův zákon).</li></ul>
      <div class="cmp"><div><strong>Jednovidové (SMF)</strong><p><b>8,5–9/125 μm</b>, jediný mód, zdroj <b>laser</b>. Na <b>dlouhé trasy</b> a WDM.</p></div>
      <div><strong>Mnohovidové (MMF)</strong><p><b>50 nebo 62,5/125 μm</b>, zdroj <b>LED / VCSEL 850 nm</b>. Levnější, na <b>krátké linky</b> (datacentrum, kampus).</p></div></div>
      <ul><li class="hl">Klíčový parametr je <b>útlum</b>: křemík asi <b>0,2 dB/km</b>, plast 50–100 dB/km. Nad 1 700 nm se vlákna nepoužívají.</li>
      <li><b>Přenosová okna:</b> O 1260–1310 · E 1360–1460 · S 1460–1530 · <b>C 1530–1562</b> · L 1560–1625 · U nad 1625 nm.</li>
      <li><b>Vlnový multiplex (WDM/DWDM)</b> přenáší víc „barev“ (vlnových délek) jedním vláknem.</li>
      <li>K přenosu je potřeba <b>vysílač se zdrojem světla</b> a <b>detektor s přijímačem</b>. V routerech jsou pro optiku sloty <b>SFP</b>.</li>
      <li>Kabel stojí 50–300 Kč/m, což je málo proti pokládce a aktivním prvkům. Proto se vždy <b>pokládá víc vláken</b>, než je potřeba.</li>
      <li>Význam <b>roste v páteřních sítích MAN a WAN</b>, v LAN klesá kvůli bezdrátu.</li>
      <li>Prakticky asi 11 Tb/s přes DWDM na 80 km, při 2,5 Gb/s asi 900 km se zesilovači EDFA.</li></ul>
      <div class="cmp"><div class="yes"><strong>Výhody</strong><p>Velká šířka pásma, nízký útlum, odolnost proti EM rušení, elektrická izolace, bezpečnost (banky, státní správa), malé rozměry.</p></div>
      <div class="no"><strong>Nevýhoda</strong><p><b>Drahé konvertory</b> a aktivní prvky.</p></div></div></div>

    <div class="lc" id="L-wif"><h2>11 · Bezdrát</h2>
      <ul><li>Bezdrát se postaví <b>rychle a na velké vzdálenosti</b>, ale je <b>méně spolehlivý a méně bezpečný</b>.</li>
      <li><b>Rádio 30 Hz – 1 GHz:</b> šíří se všesměrově (AM/FM, vysílačky, IoT).</li>
      <li><b>Mikrovlny 1 – 100 GHz:</b> šíří se přímočaře, potřebují <b>přímou viditelnost</b> (WiFi, 5G, GSM, satelity).</li></ul>
      <div class="cmp"><div><strong>Nelicencované (WiFi)</strong><p>Bez povolení ČTU a <b>zdarma</b>, ale kanál <b>nikdo nezaručí</b>. Rušení omezí směrové antény (pozor na Fresnelovu zónu).</p></div>
      <div><strong>Licencované</strong><p>Přiděluje <b>ČTU</b>, frekvence je <b>chráněná</b>. Až 622 Mb/s, dosah asi 50 km. Kapacitu nesnižuje počet klientů.</p></div></div>
      <h3>WiFi</h3><ul>
      <li><b>2,4 GHz:</b> vlna 12,5 cm, z 95 % ji pohltí voda a organické látky (stromy, dřevo).</li>
      <li><b>5 GHz:</b> vlna 6 cm, voda ji pohlcuje mnohem méně.</li>
      <li><b>6 GHz:</b> nové pásmo, kanály se nepřekrývají. <b>Nezaměňovat s WiFi 6</b>, což je jen standard.</li>
      <li><b>10 GHz:</b> jen spoje bod–bod, až 34 Mb/s, dosah až 40 km.</li>
      <li>Reálná rychlost je podle vzorkovacího teorému <b>minimálně poloviční</b> proti nominální.</li></ul>
      <table class="lt"><tr><th></th><th>WiFi 5</th><th>WiFi 6 / 6E</th><th>WiFi 7</th></tr>
      <tr><td>Std.</td><td>802.11ac</td><td>802.11ax</td><td>802.11be</td></tr>
      <tr><td>Pásma</td><td>5</td><td>2,4+5 (/+6)</td><td>2,4+5+6</td></tr>
      <tr><td>Max</td><td>6 933 Mb/s</td><td>9 608 Mb/s</td><td>46 120 Mb/s</td></tr>
      <tr><td>Kanál</td><td>160</td><td>160</td><td>320 MHz</td></tr>
      <tr><td>QAM</td><td>256</td><td>1024</td><td>4096</td></tr>
      <tr><td>Zabezp.</td><td>WPA2</td><td>WPA3</td><td>WPA4</td></tr>
      <tr><td>Novinka</td><td>40 MHz</td><td>TWT, BSS col., beamf.</td><td>MLO, Multi-RU, punct.</td></tr>
      <tr><td>Rok</td><td>2014</td><td>2019 / 2020</td><td>2024</td></tr></table>
      <ul><li><b>MESH:</b> více prvků se tváří jako jeden router (jedna síť, název, heslo). Klient se připojí k nejlepšímu signálu.</li>
      <li class="hl"><b>Základní bezpečnostní zásada WiFi:</b> změnit výchozí nastavení zařízení.</li></ul>
      <h3>Bezdrátová optika</h3><ul>
      <li><b>FSO:</b> laser nebo LED vzduchem <b>bod–bod do 5 km</b>, až 1 250 Mb/s, bez licence. Úzký svazek se těžko odposlouchává, potřebuje přímou viditelnost.</li>
      <li class="hl">Největší nepřítel FSO je <b>hustá mlha</b>, déšť ani sníh nevadí. S rádiovou zálohou dosáhne dostupnosti <b>99,999 %</b>.</li>
      <li><b>VLC:</b> přenos dat viditelným světlem LED, většinou simplexně.</li>
      <li><b>LiFi:</b> LED bliká tak rychle, že to oko nepostřehne. Nemá EM rušení a má nízkou spotřebu.</li>
      <li>Historie: photophone (Bell, 1880), český projekt <b>RONJA</b>.</li></ul></div>
`,
});
