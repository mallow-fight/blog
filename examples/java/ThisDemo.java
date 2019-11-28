class ThisDemo {
  int A;
  public void setA(int a) {
    this.A = a;
  }
  public int getA() {

    return this.A;
  }
  public static void main(String args[]) {
    ThisDemo demo = new ThisDemo();
    demo.setA(123);
    System.out.println(demo.getA());
  }
}