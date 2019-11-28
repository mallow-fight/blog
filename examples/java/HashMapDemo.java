import java.util.*;
class HashMapDemo {
  public static void main(String[] args) {
    HashMap<Integer, String> x = new HashMap<Integer, String>();
    x.put(1, "abc");
    System.out.println(x.get(1));
  }
}