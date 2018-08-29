var data = [
  [
    1,
    'Project1',
    '22.06.2019'
  ],
  [
    2,
    'Project2',
    '07.05.2021'
  ]
]

data.forEach(function(row) {
  row.push("<a href=\"" + "/projects/" + row[0] +
                        "\" class=\"btn btn-success width-100\" title=\"Details\">Details<\/a>")
})

$('#projectsTable').DataTable({
  data: data
})

