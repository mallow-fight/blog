class StaticDemo {
  int c;
  static int a;
  static int b;
  static {
    a = 10;
  }
  StaticDemo(int b) {
    this.a++;
    this.b = b;
  }
  private void log(int arg) {
    System.out.println(arg);
  }
  public static void main(String args[]) {
    System.out.println(StaticDemo.a);
    System.out.println(StaticDemo.b);
    StaticDemo demo = new StaticDemo(20);
    demo.log(a);
    demo.log(b);
    System.out.println(a);
    System.out.println(b);
  }
}