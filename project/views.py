from django.shortcuts import render

def handle_404(request,exception):
  return render(request,'errors/404_page.html',status=404)

def handle_500(request):
  return render(request,'errors/500_page.html',status=500)