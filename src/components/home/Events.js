export default [
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2018, 7, 8, 12, 0, 0, 0),
      end: new Date(2018, 7, 8, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2018, 7, 10, 14, 0, 0, 0),
      end: new Date(2018, 7, 10, 15, 0, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 8)),
      end: new Date(new Date().setHours(new Date().getHours() -7)),
    }
  ]