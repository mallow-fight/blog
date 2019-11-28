class ArrayDemo {
  public static void main(String args[]) {
    System.out.println(args[0]);
    int len = 10;
    int items[] = new int[len];
    for(int i = 0; i < len; i++) {
      items[i] = i;
      System.out.println("items[" + i + "] = " + items[i]);
    }
    String items1[] = {"a", "b", "c"};
    for(int j = 0; j < items1.length; j++) {
      System.out.println(items1[j]);
    }
  }
}