var keys = [
// menu links (t.o.n)
{ key: 'h', link: 'a[title=home]' }, // g + h
{ key: 'n', link: 'a[title=nieuws & info]' },
{ key: 'f', link: 'a[title=forums]' },
{ key: 'g', link: 'a[title=gateway]' },
{ key: 'o', link: 'a[title=opleidingen]' },
{ key: 'w', link: 'a[title=wiki]' },
{ key: 'd', link: 'a[title=flaming dog]' },
{ key: 'u', link: 'a[title=LAS Urenregistratie]' },
{ key: 'z', link: 'a[title=Zarafa: E-mail & Agenda]' },
{ key: 'l', link: 'a[title=Intranet III]' },
// menu links (b.t.o.n)
{ key: 'h', link: '.topBar a[title=]:contains(terminal center)' },
{ key: 'n', link: '.topBar a[title=]:contains(nieuws & info)' },
{ key: 'f', link: '.topBar a[title=]:contains(interne forums)' },
{ key: 'g', link: '.topBar a[title=]:contains(sociaal netwerk)' },
{ key: 'o', link: '.topBar a[title=]:contains(cursussen & trajecten)' },
{ key: 'w', link: '.topBar a[title=]:contains(interne wiki)' },
{ key: 'd', link: '.topBar a[title=]:contains(personeelsvereniging website)' },
{ key: 'u', link: '.topBar a[title=]:contains(LAS Urenregistratie)' },
{ key: 'z', link: '.topBar a[title=]:contains(Zarafa: E-mail & Agenda)' },
{ key: 'l', link: '.topBar a[title=]:contains(personeelsvereniging website)' },

// content links
{ key: 'c', link: '.commonContentActionButton > a' }, // c + a: content action

// focus
{ key: '/', focus: '#global_search_criteria' },
{ key: 'c', focus: '#newMsgTextArea-1' },

// click
{ key: 'shift+c', click: '.chatConnections .bottomTab' },

// actions
{ key: '?', action: 'help' },
{ key: 'r', action: 'reload' },
];
